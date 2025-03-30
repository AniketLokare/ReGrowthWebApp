import React from 'react';
import {
  Button,
  ErrorBoundary,
  FormError,
  Icon,
  PageLoader,
  Snackbar,
  SubPanel,
  LoadingBackdrop,
} from 'src/components';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ConfirmationModal from 'src/components/ConfirmationModal';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeletePatient, useGetPatientDetail } from 'src/hooks/usePatients';
import { viewPatientBreadCrumbLinks } from '../constants';
import { getEditPatientRoute, PATIENTS } from 'src/constants/paths';
import PatientBasicInfo from './PatientBasicInfo';
import { ERROR_RED, WHITE_SMOKE } from 'src/constants/colors';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { Avatar } from '@mui/material';

const ViewPatient: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const patientDetails = useGetPatientDetail(
    {
     id,
    }
  );

  const isFetching = patientDetails.isLoading;
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const onEditPatient = () => {
    navigate(getEditPatientRoute(id));
  };

  const { mutate: deletePatient, isPending: isDeleteInProgress } =
    useDeletePatient({
      onSuccess: () => {
        navigate(PATIENTS, {
          state: {
            alert: {
              severity: 'success',
              title: 'Patient Deleted.',
              message: `Patient "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deletePatient });

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
        pageTitle="PATIENT DETAILS"
        breadcrumbLinks={viewPatientBreadCrumbLinks}
      />
      <PageLoader isLoading={isFetching} Components={{ Loading: 'form' }}>
        <Stack spacing={3} sx={{ marginTop: '60px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: WHITE_SMOKE,
              minHeight: '60px',
              padding: '20px',
              borderRadius: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                marginLeft: '20px',
              }}
            >
              <Box>
                {' '}
                <Avatar />{' '}
              </Box>
              <Typography
                sx={{ fontWeight: '600', fontSize: '26px', marginLeft: '20px' }}
              >
                {patientDetails?.data?.firstName} {patientDetails.data?.lastName}
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
                onClick={onEditPatient}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(
                    patientDetails?.data?.patientId.toString() || '',
                    patientDetails.data?.firstName || '',
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <PatientBasicInfo patientDetails={patientDetails.data}/>
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

export default ViewPatient;