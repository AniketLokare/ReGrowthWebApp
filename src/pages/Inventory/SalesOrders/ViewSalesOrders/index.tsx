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
import { useDeleteSaleOrder, useGetSaleOrderDetail } from 'src/hooks/useSalesOrder';
import {
  viewSalesOrdersBreadCrumbLinks,
  getAddEditBreadCrumbLinks, 
} from '../constants';
import SalesBasicInfo from './SalesBasicInfo';
import { ERROR_RED, WHITE_SMOKE } from 'src/constants/colors';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { Avatar } from '@mui/material';
import { getEditSaleRoute,NEW_SALES_TRANSACTIONS_PATH } from 'src/constants/paths';

const ViewSalesOrders: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const salesOrderDetails = useGetSaleOrderDetail({
    id,
  });

  const isFetching = salesOrderDetails.isLoading;
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const onEditSalesOrder = () => {
    navigate(getEditSaleRoute(id));
  };

  const { mutate: deleteSaleOrder, isPending: isDeleteInProgress } =
    useDeleteSaleOrder({
      onSuccess: () => {
        navigate(viewSalesOrdersBreadCrumbLinks[0].href, {
          state: {
            alert: {
              severity: 'success',
              title: 'Bill  Deleted.',
              message: `Bill Of "${deleteConfirmationModalValues?.name}" was successfully deleted.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteSaleOrder });

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
        pageTitle="BILL DETAILS"
        breadcrumbLinks={viewSalesOrdersBreadCrumbLinks}
        rightSideButtonText="Add Medicine"
                  rightSideButtonClickEvent={() => {
                    navigate(NEW_SALES_TRANSACTIONS_PATH, { state: id  });
                  }}
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
  {/* Left Section: Avatar and Vendor Name */}
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
      <Avatar />
    </Box>
    <Typography
      sx={{ fontWeight: '600', fontSize: '26px', marginLeft: '20px' }}
    >
      {salesOrderDetails?.data?.patientName}
    </Typography>
  </Box>

  {/* Right Section: Action Buttons */}
  <Box
    sx={{
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}
  >
    <Button
      variant="outlined"
      onClick={onEditSalesOrder}
      startIcon={<Icon icon="edit" size="15" />}
      sx={{ marginRight: '20px' }}
    >
      Pay Now
    </Button>
    <Button
      variant="contained"
      onClick={() =>
        onShowDeleteConfirmationModal(
          salesOrderDetails?.data?.billId.toString() || '',
          salesOrderDetails?.data?.patientName || '',
        )
      }
      startIcon={<Icon icon="trash" size="15" />}
      sx={{ backgroundColor: ERROR_RED }}
    >
      Delete
    </Button>
  </Box>
</Box>

          <SalesBasicInfo salesOrderDetails={salesOrderDetails.data} />
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
export default ViewSalesOrders;
