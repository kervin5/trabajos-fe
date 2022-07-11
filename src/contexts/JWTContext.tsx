import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from 'axios';
import { isValidToken, setSession } from '../utils/jwt';
// @types
import { ActionMap, AuthState, AuthUser, JWTContextType } from '../@types/auth';

// ----------------------------------------------------------------------

enum Types {
  Initial = 'INITIALIZE',
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  Register = 'REGISTER',
}

type JWTAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type JWTActions = ActionMap<JWTAuthPayload>[keyof ActionMap<JWTAuthPayload>];

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const JWTReducer = (state: AuthState, action: JWTActions) => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<JWTContextType | null>(null);

// ----------------------------------------------------------------------

type AuthProviderProps = {
  children: ReactNode;
};

function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(JWTReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.post(
            process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string,
            {
              query: `query {
              identify {
                id
                firstName
                lastName
                displayName
                email
              }
            }`,
            },
            {
              headers: {
                ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
              },
            }
          );

          const user = response.data.data?.identify;

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
      query: `mutation {
              login(data: {email: "${email}", password: "${password}"}) {
                accessToken
                user {
                  id
                  firstName
                  lastName
                  displayName
                  email
                }
              }
            }`,
    });

    if (response.data.data?.login?.user) {
      setSession(response.data.data.login.accessToken);
      dispatch({
        type: Types.Login,
        payload: {
          user: response.data.data.login.user,
        },
      });
    } else {
      if (
        response?.data?.errors?.length &&
        response?.data?.errors?.some((e: Error) => e.message === 'Unauthorized')
      ) {
        throw new Error('El usuario o la contraseña son invalidos.');
      } else {
        throw new Error('Ha ocurrido un error.');
      }
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post(process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT as string, {
      query: `
      mutation {
        register(data: { email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}", isEmployer: false} ) {
          accessToken
          user {
            id
            email
            firstName
            lastName
            displayName
          }
        }
      }`,
    });

    if (response.data.data?.register) {
      const { accessToken, user } = response.data.data.register;

      window.localStorage.setItem('accessToken', accessToken);
      dispatch({
        type: Types.Register,
        payload: {
          user,
        },
      });
    }
  };

  const logout = async () => {
    setSession(null);
    dispatch({ type: Types.Logout });
  };

  const accessToken =
    typeof window !== 'undefined' ? window.localStorage.getItem('accessToken') : null;

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
