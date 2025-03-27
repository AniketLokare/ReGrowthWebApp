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
import {
  expenseDefaultFormValues,
  expenseFormValidationSchema,
  getAddEditBreadCrumbLinks,
} from '../constants';
import { EXPENSE } from 'src/constants/paths';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useCreateExpense, useGetExpenseDetail, usePatchExpense } from 'src/hooks/useExpenses';
import ExpenseForm from './Form';
import { formatRegDate } from 'src/util/common';

const AddEditExpense: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { id = '' } = useParams();
  const isEdit = !!id;

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const methods = useForm<CreateExpensePayload>({
    defaultValues: expenseDefaultFormValues,
    resolver: yupResolver<CreateExpensePayload>(expenseFormValidationSchema),
    mode: 'onBlur',
  });

  const { isFetching, response } = useGetExpenseDetail({
    id,
  });

  useEffect(() => {
    if (!isFetching && response) {
      if (response.date) {
        response.date = formatRegDate(response.date);;
      }
      reset(response);
    }
  }, [response, isFetching]);

  const { mutate: patchExpense, isPending: isPatchLoading } = usePatchExpense(
    id,
    {
      onSuccess: () => {
        navigate(EXPENSE, {
          state: {
            alert: {
              severity: 'success',
              title: 'Expense Updated.',
              message: `Expense updated successfully.`,
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

  const { mutate: createExpense, isPending: isCreatingExpense } =
    useCreateExpense({
      onSuccess: () => {
        navigate(EXPENSE, {
          state: {
            alert: {
              severity: 'success',
              title: 'Expense Created.',
              message: `Expense created successfully.`,
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

  const onSubmit = (data: CreateExpensePayload) => {
    if (data.date) {
      data.date = formatRegDate(data.date);;
    }
    if (isEdit) {
      patchExpense(data);
    } else {
      createExpense(data);
    }
  };

  const isMutating = isCreatingExpense || isPatchLoading;

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
            pageTitle={isEdit ? 'Edit Expense' : 'New Expense'}
            breadcrumbLinks={getAddEditBreadCrumbLinks(isEdit)}
            secondaryButtonText={isEdit ? 'Save Changes' : undefined}
            secondaryButtonIcon={<FiSave />}
            disableSecondaryButton={!isDirty}
            secondaryButtonType="submit"
          />

          <Box sx={{ marginTop: '60px' }}>
            <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
              <ExpenseForm />

              <Box sx={{ marginTop: '60px' }}>
                <Button
                  variant="outlined"
                  sx={{
                    width: '170px',
                    borderWidth: '2px',
                    marginLeft: '20px',
                    marginBottom: '20px',
                  }}
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </Button>
                {!isEdit && (
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      width: '170px',
                      marginLeft: '20px',
                      marginBottom: '20px',
                    }}
                  >
                    SAVE
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

export default AddEditExpense;
