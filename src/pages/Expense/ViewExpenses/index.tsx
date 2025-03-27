import React from 'react';
import {
  Button,
  ConfirmationModal,
  ErrorBoundary,
  FormError,
  Icon,
  LoadingBackdrop,
  PageLoader,
  Snackbar,
  SubPanel,
} from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useNavigate, useParams } from 'react-router-dom';
import { viewExpensesBreadCrumbLinks } from '../constants';
import { ERROR_RED } from 'src/constants/colors';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { EXPENSE, getEditExpenseRoute } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteExpense, useGetExpenseDetail } from 'src/hooks/useExpenses';
import ExpenseBasicInfo from './ExpenseBasicInfo';

const ViewExpense: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isFetching, response } = useGetExpenseDetail({
    id,
  });
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();
    
  const onEditExpense = () => {
    navigate(getEditExpenseRoute(id));
  };

  const { mutate: deleteExpense, isPending: isDeleteInProgress } =
    useDeleteExpense({
      onSuccess: () => {
        navigate(EXPENSE, {
          state: {
            alert: {
              severity: 'success',
              title: 'Expense Deleted.',
              message: `Expense "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
    deleteConfirmationModalValues,
    onDeleteConfirm,
    showDeleteConfirmationModal,
    onShowDeleteConfirmationModal,
    onClose,
  } = useDeleteConfirmationModal({ onDelete: deleteExpense });
  
  return (
    <ErrorBoundary fallbackComponent={FormError}>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />
      <SubPanel
        pageTitle="EXPENSE DETAILS"
        breadcrumbLinks={viewExpensesBreadCrumbLinks}
      />
      <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
        <Stack spacing={3} sx={{ marginTop: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                sx={{ fontWeight: '600', fontSize: '26px', lineHeight: '31px' }}
              >
                {response?.category}
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Button
                variant="outlined"
                onClick={onEditExpense}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(
                    response?.expenseId.toString() || '',
                    response?.category || '',
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <ExpenseBasicInfo expenseDetails={response} />
          <Box>
            <Button
              variant="outlined"
              startIcon={<Icon icon="arrowLeft" size="15" />}
              sx={{ padding: '20px' }}
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </Box>
          <ConfirmationModal
            onClose={onClose}
            onSubmit={onDeleteConfirm}
            open={showDeleteConfirmationModal}
          />
        </Stack>
      </PageLoader>
    </ErrorBoundary>
  );
};

export default ViewExpense;