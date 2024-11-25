import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Snackbar,
  Actions,
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { useDeleteMedicine, useGetMedicinesList } from 'src/hooks/useMedicines';
import useDeleteConfirmationModalm from 'src/hooks/useMedicines';
import { FiUser } from 'react-icons/fi';
import {
  getEditMedicineRoute,
  getEditPatientRoute,
  getEditProcedureRoute,
  getViewMedicinePath,
  NEW_MEDICINE_PATH,
} from 'src/constants/paths';
import {
  medicinesTableColumns,
  listMedicinesBreadcrumbLinks,
} from './constant';
import { useNavigate } from 'react-router-dom';

const Medicines: React.FC = (): React.ReactElement => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState, onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();

  const { response, isFetching, isError, refetch } = useGetMedicinesList({
    apiConfig: {
      params: {
        _page: pageNumber,
        firstName: debouncedSearchQuery, // Adjust this key to match your API parameter
      },
    },
  });

  const { mutate: deleteMedicine, isPending: isDeleteInProgress } =
    useDeleteMedicine({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Medicine Deleted',
          message: `Medicine "${deleteConfirmationModalValuesm?.name}" deleted successfully.`,
        });
        refetch();
      },
      onError: (err: Error) => {
        setSnackbarAlertState({
          severity: 'error',
          title: 'Error',
          message: err.message,
        });
      },
    });

  const {
    deleteConfirmationModalValuesm,
    onDeleteConfirm,
    showDeleteConfirmationModalm,
    onShowDeleteConfirmationModalm,
    onClose,
  } = useDeleteConfirmationModalm({ onDelete: deleteMedicine });

  const noData = !response?.data?.length;

  const usersTableColumnsWithActions = useMemo(
    () => [
      {
        id: 'avatar',
        cell: () => <FiUser size="20px" />,
      },
      ...medicinesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const medicineValues = row.original;

          return (
            <Actions
              onEditClick={() =>
                navigate(getEditMedicineRoute(medicineValues.id))
              }
              onDeleteClick={() =>
                onShowDeleteConfirmationModalm(
                  medicineValues.id,
                  medicineValues.username,
                )
              }
              onViewDetails={() =>
                navigate(getViewMedicinePath(medicineValues.id))
              }
            />
          );
        },
      },
    ],
    [navigate],
  );

  return (
    <>
      <LoadingBackdrop loading={!!isDeleteInProgress} />
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="MEDICINES"
          breadcrumbLinks={listMedicinesBreadcrumbLinks}
          rightSideButtonText="New Medicine"
          rightSideButtonClickEvent={() => navigate(NEW_MEDICINE_PATH)}
        />
        <TableContainer
          onFiltersChange={(filters) => setFilters(filters)}
          placeholder="Search By Medicine Name"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No medicines found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={usersTableColumnsWithActions}
                  data={response?.data || []}
                  totalRecords={response?.items || 0}
                  onPageChange={changePageNumber}
                  pageNumber={pageNumber}
                />
              </PageLoader>
            </Box>
          )}
        </TableContainer>
      </Stack>
      <ConfirmationModal
        onClose={onClose}
        onSubmit={onDeleteConfirm}
        open={showDeleteConfirmationModalm}
      />
    </>
  );
};

export default Medicines;
