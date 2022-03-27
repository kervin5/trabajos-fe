import { createContext, ReactNode, useEffect, useReducer } from 'react';
// utils
import axios from '../utils/axios';
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
            '/graphql' as string,
            {
              query: `query {
              me {
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

          const user = response.data.data?.me;

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
    const response = await axios.post('/graphql' as string, {
      query: `mutation {
              login(email: "${email}", password: "${password}") {
                token
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

    if (response.data.data?.login) {
      setSession(response.data.data.login.token);
      dispatch({
        type: Types.Login,
        payload: {
          user: response.data.data.login.user,
        },
      });
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    const response = await axios.post('/graphql' as string, {
      query: `
      mutation {
        register(email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}") {
          token
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
      const { token, user } = response.data.data.register;

      window.localStorage.setItem('accessToken', token);
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
