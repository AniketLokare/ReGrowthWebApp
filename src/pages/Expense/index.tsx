import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
  FiltersState,
  SubPanel,
  PageLoader,
  Table,
  TableContainer,
  Actions,
  Snackbar,
  ConfirmationModal,
  LoadingBackdrop,
} from 'src/components';
import { ExpensesTableColumns, listExpensesBreadcrumbLinks } from './constants';
import { usePagination } from 'src/hooks/usePagination';
import { useDebounce } from '@uidotdev/usehooks';
import { useNavigate } from 'react-router-dom';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditExpenseRoute, getViewExpensePath, NEW_EXPENSE_PATH } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import { useDeleteExpense, useGetExpenseList } from 'src/hooks/useExpenses';

const Expense: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<FiltersState>();
  const debouncedSearchQuery = useDebounce(filters?.searchQuery, 500);

  const { snackbarAlertState, setSnackbarAlertState,  onDismiss } =
    useSnackbarAlert();

  const { pageNumber, changePageNumber } = usePagination();
  const { response, isFetching, isError, refetch } = useGetExpenseList({
    apiConfig: {
      params: {
        _page: pageNumber,// TODO: Change this to full text search
        category: debouncedSearchQuery,
      },
    },
  });

  const { mutate: deleteExternalProcedure, isPending: isDeleteInProgress } =
    useDeleteExpense({
      onSuccess: () => {
        setSnackbarAlertState({
          severity: 'success',
          title: 'Expense Deleted.',
          message: `Expense "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
        });

        refetch();
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
  } = useDeleteConfirmationModal({ onDelete: deleteExternalProcedure });

  const noData = !response?.content?.length;

  const expenseTableColumnsWithActions = useMemo(
    () => [
      ...ExpensesTableColumns,
      {
        id: 'actions',
        cell: ({ row }) => {
          const expenseValues = row.original;
          return (
            <Actions
              onEditClick={() => {
                navigate(getEditExpenseRoute(expenseValues.expenseId.toString()));
              }}
              onDeleteClick={() => {
                onShowDeleteConfirmationModal(
                  expenseValues.expenseId.toString(),
                  expenseValues.category,
                );
              }}
              onViewDetails={() => {
                navigate(getViewExpensePath(expenseValues.expenseId.toString()));
              }}
            />
          );
        },
      },
    ],
    [],
  );

  return (
    <>
      <Snackbar
        open={!!snackbarAlertState.message}
        severity={snackbarAlertState.severity}
        message={snackbarAlertState.message}
        onClose={onDismiss}
      />
      <LoadingBackdrop loading={isDeleteInProgress} />
      <Stack spacing={2}>
        <SubPanel
          pageTitle="EXPENSES"
          breadcrumbLinks={listExpensesBreadcrumbLinks}
          rightSideButtonText="New Expense"
                rightSideButtonClickEvent={() => {
                  navigate(NEW_EXPENSE_PATH);
                }}
        />
        <TableContainer
          onFiltersChange={(filters) => {
            setFilters(filters);
          }}
          placeholder="Search By Category"
        >
          {({ showFilters }) => (
            <Box>
              <PageLoader
                isLoading={isFetching}
                isEmpty={(noData && !isError) || (noData && showFilters)}
                emptyMessage="No expense found"
                Components={{ Loading: 'table' }}
              >
                <Table
                  columns={expenseTableColumnsWithActions}
                  data={response?.content || []}
                  totalRecords={response?.items}
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
        open={showDeleteConfirmationModal}
      />
    </>
  );
  
};

export default Expense;
