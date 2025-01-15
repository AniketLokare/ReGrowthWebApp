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
<<<<<<< HEAD
import { MEDICINES } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getAddEditBreadCrumbLinks, medicineDefaultFormValues, medicineFormValidationSchema } from '../constants';
import { useCreateMedicine, useGetMedicineDetail, usePatchMedicine } from 'src/hooks/useMedicines';
import MedicineForm from './Form';

const AddEditMedicine: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
=======
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
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateMedicinePayload>({
<<<<<<< HEAD
    defaultValues: medicineDefaultFormValues,
=======
    defaultValues: MedicineDefaultFormValues,
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
    resolver: yupResolver<CreateMedicinePayload>(medicineFormValidationSchema),
    mode: 'onBlur',
  });

<<<<<<< HEAD
  const { isFetching, data } = useGetMedicineDetail({
    id,
  });
=======
  const { isFetching, data } = useGetMedicineDetail({ id });
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9

  useEffect(() => {
    if (!isFetching && data) {
      reset(data);
    }
<<<<<<< HEAD
  }, [data, isFetching]);
=======
  }, [data, isFetching, methods]);
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9

  const { mutate: patchMedicine, isPending: isPatchLoading } = usePatchMedicine(
    id,
    {
      onSuccess: () => {
        navigate(MEDICINES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Medicine Updated.',
<<<<<<< HEAD
              message: `Medicine updated successfully.`,
=======
              message: 'Medicine updated successfully.',
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
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
<<<<<<< HEAD
              message: `Medicine created successfully.`,
=======
              message: 'Medicine created successfully.',
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
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
<<<<<<< HEAD
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
=======
            breadcrumbLinks={getAddEditMedicinesBreadcrumbLinks(isEdit)}
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px', maxWidth: '630px' }}>
<<<<<<< HEAD
            <PageLoader Components={{ Loading: 'form' }}>
=======
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
>>>>>>> 413790b57ad5a776c1e262aac756565df36740a9
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
