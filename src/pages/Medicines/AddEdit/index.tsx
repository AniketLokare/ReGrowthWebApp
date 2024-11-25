import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  ErrorBoundary,
  FormError,
  PageLoader,
  Snackbar,
  SubPanel,
  LoadingBackdrop,
} from 'src/components';
import Box from '@mui/material/Box';
import { useNavigate, useParams } from 'react-router-dom';
import { FiSave } from 'react-icons/fi';
import MedicineForm from './Form';
import {
  getAddEditMedicinesBreadcrumbLinks,
  listMedicinesBreadcrumbLinks,
  viewMedicineBreadCrumbLinks,
  MedicineDefaultFormValues,
  medicinesTableColumns,
  medicineFormValidationSchema,
} from '../constants';
import { MEDICINES } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import {
  useCreateMedicine,
  useGetMedicineDetail,
  usePatchMedicine,
} from 'src/hooks/useMedicines';

const AddEditMedicine: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateMedicinePayload>({
    defaultValues: MedicineDefaultFormValues,
    resolver: yupResolver<CreateMedicinePayload>(medicineFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, data } = useGetMedicineDetail({ id });

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
  }, [data, isFetching, methods]);

  const { mutate: patchMedicine, isPending: isPatchLoading } = usePatchMedicine(
    id,
    {
      onSuccess: () => {
        navigate(MEDICINES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Medicine Updated.',
              message: 'Medicine updated successfully.',
            },
          },
        });
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    },
  );

  const { mutate: createMedicine, isPending: isCreatingMedicine } =
    useCreateMedicine({
      onSuccess: () => {
        navigate(MEDICINES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Medicine Created.',
              message: 'Medicine created successfully.',
            },
          },
        });
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'ERROR.',
          message: err.message,
        });
      },
    });

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = methods;

  const onSubmit = (data: CreateMedicinePayload) => {
    if (isEdit) {
      patchMedicine(data);
    } else {
      createMedicine(data);
    }
  };

  const isMutating = isCreatingMedicine || isPatchLoading;

  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <LoadingBackdrop loading={isMutating} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />

      <FormProvider {...methods}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <SubPanel
            pageTitle={isEdit ? 'Edit Medicine' : 'New Medicine'}
            breadcrumbLinks={getAddEditMedicinesBreadcrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <MedicineForm />

              <Box sx={{ marginTop: '60px' }}>
                <Button
                  variant="outlined"
                  sx={{ width: '170px', borderWidth: '2px' }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                {!isEdit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: 'fit-content', marginLeft: '20px' }}
                  >
                    Create Medicine
                  </Button>
                )}
              </Box>
            </PageLoader>
          </Box>
        </Box>
      </FormProvider>
    </ErrorBoundary>
  );
};

export default AddEditMedicine;
