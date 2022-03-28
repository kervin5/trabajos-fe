import * as Yup from 'yup';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// next
import { useRouter } from 'next/router';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import {
  Grid,
  Card,
  Chip,
  Stack,
  Button,
  TextField,
  Typography,
  Autocomplete,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
import { NewJobFormValues } from 'src/@types/jobs';
//components
import {
  RHFSwitch,
  RHFEditor,
  FormProvider,
  RHFTextField,
  // RHFUploadSingleFile,
} from '../../../components/hook-form';
//
import JobsNewJobPreview from './JobsNewJobPreview';
import LocationAutocomplete from 'src/components/input/LocationAutocomplete';
import { useCreateJobMutation } from 'src/generated/graphql';
import gql from 'graphql-tag';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots',
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

gql`
  mutation CreateJob($data: JobCreateInput!) {
    createJob(data: $data) {
      id
      title
      content
    }
  }
`;

export default function JobsNewJobForm() {
  const { push } = useRouter();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewJobSchema = Yup.object().shape({
    title: Yup.string().required('Titulo es requerido'),
    // description: Yup.string().required('Description is required'),
    content: Yup.string().min(500).required('El contenido es requerido'),
    // cover: Yup.mixed().required('Cover is required'),
    location: Yup.string().required('La ubicación es requerida').nullable(),
  });

  const defaultValues = {
    title: '',
    // description: '',
    content: '',
    // cover: null,
    tags: [],
    publish: true,
    // comments: true,
    // metaTitle: '',
    // metaDescription: '',
    // metaKeywords: [],
    location: '',
  };

  const methods = useForm<NewJobFormValues>({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    // setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const [createJob, { error, loading }] = useCreateJobMutation();

  const onSubmit = async (data: NewJobFormValues) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      await createJob({ variables: { data: { ...values } } });
      reset();
      handleClosePreview();
      enqueueSnackbar(
        values.publish ? 'La oferta ha sido publicado' : 'El borrador ha sido guardado'
      );
      push(PATH_DASHBOARD.jobs.list);
    } catch (error) {
      enqueueSnackbar('Ha ocurrido un error', { variant: 'error' });
      console.error(error);
    }
  };

  // const handleDrop = useCallback(
  //   (acceptedFiles) => {
  //     const file = acceptedFiles[0];

  //     if (file) {
  //       setValue(
  //         'cover',
  //         Object.assign(file, {
  //           preview: URL.createObjectURL(file),
  //         })
  //       );
  //     }
  //   },
  //   [setValue]
  // );

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="Titulo" />
                <Controller
                  name="location"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <LocationAutocomplete
                      onChange={(newValue) => field.onChange(newValue)}
                      value={field.value}
                      label="Ubicación"
                      placeholder='Ej: "San Francisco, CA"'
                      error={error}
                    />
                  )}
                />
                {/* <RHFTextField name="description" label="Description" multiline rows={3} /> */}

                <div>
                  <LabelStyle>Contenido</LabelStyle>
                  <RHFEditor
                    name="content"
                    placeholder="Responsabilidades, requerimientos, beneficios..."
                  />
                </div>

                {/* <div>
                  <LabelStyle>Cover</LabelStyle>
                  <RHFUploadSingleFile
                    name="cover"
                    accept="image/*"
                    maxSize={3145728}
                    onDrop={handleDrop}
                  />
                </div> */}
              </Stack>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <RHFSwitch
                    name="publish"
                    label="Publicar"
                    labelPlacement="start"
                    sx={{ mb: 1, mx: 0, width: 1, justifyContent: 'space-between' }}
                  />

                  {/* <RHFSwitch
                    name="comments"
                    label="Enable comments"
                    labelPlacement="start"
                    sx={{ mx: 0, width: 1, justifyContent: 'space-between' }}
                  /> */}
                </div>

                <Controller
                  name="tags"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Etiquetas" {...params} />}
                    />
                  )}
                />

                {/* <RHFTextField name="metaTitle" label="Meta title" /> */}

                {/* <RHFTextField
                  name="metaDescription"
                  label="Meta description"
                  fullWidth
                  multiline
                  rows={3}
                /> */}

                {/* <Controller
                  name="metaKeywords"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      multiple
                      freeSolo
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={TAGS_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            {...getTagProps({ index })}
                            key={option}
                            size="small"
                            label={option}
                          />
                        ))
                      }
                      renderInput={(params) => <TextField label="Meta keywords" {...params} />}
                    />
                  )}
                /> */}
              </Stack>
            </Card>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <Button
                fullWidth
                color="inherit"
                variant="outlined"
                size="large"
                onClick={handleOpenPreview}
              >
                Vista Previa
              </Button>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                loading={isSubmitting || loading}
              >
                {values.publish ? 'Publicar Oferta' : 'Guardar Borrador'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

      <JobsNewJobPreview
        values={values}
        isOpen={open}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={handleClosePreview}
        onSubmit={handleSubmit(onSubmit)}
      />
    </>
  );
}
