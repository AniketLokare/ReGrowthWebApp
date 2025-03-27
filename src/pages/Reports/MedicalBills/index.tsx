import React, { useState,useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {
    SubPanel,
    PageLoader,
    Table,
    Snackbar,
    InfoField,
    FormInput,
} from 'src/components';
import {
    Select,
    MenuItem,
    FormControl,
    Divider,
    InputLabel,
    Typography,
    Button,
} from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { HiOutlineCash } from 'react-icons/hi';
import { MdBookOnline } from 'react-icons/md';
import { TbReportSearch } from 'react-icons/tb';
import { FaMobileAlt } from "react-icons/fa";
import { RiDiscountPercentLine } from "react-icons/ri";
import { viewSalesOrdersReportBreadCrumbLinks, salesOrdersReportTableColumns } from '../../Inventory/SalesOrders/constants';
import { WHITE_SMOKE } from 'src/constants/colors';
import { useGetFilteredBills } from 'src/hooks/useSalesOrder';
import { usePagination } from 'src/hooks/usePagination';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { format } from 'date-fns';

const MedicalBills: React.FC = (): JSX.Element => {
    const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();
    const { pageNumber, changePageNumber } = usePagination();

    const [filters, setFilters] = useState({ session: 'Both' });
    const [shouldFetch, setShouldFetch] = useState(false);

    const methods = useForm({
        defaultValues: {
            fromDate: '',
            toDate: '',
        },
    });

    const { control, handleSubmit, watch, setValue, formState: { errors } } = methods;

    const formatDate = (date: string) => {
        return date ? format(new Date(date), 'dd-MM-yyyy') : '';
    };

    const { response, isFetching, isError, refetch } = useGetFilteredBills({
        fromDate: formatDate(watch('fromDate')),
        toDate: formatDate(watch('toDate')),
       
    });

    const noData = !response?.length;

    const onApplyFilters = () => {
        setShouldFetch(true); // Mark as ready to fetch
        refetch(); // Trigger the query manually
    };

    

    const {   finalAmountTotal,onlineTotal,cashTotal} = useMemo(() => {
        if (!response || response.length === 0) {
            return {  finalAmountTotal: 0, onlineTotal: 0,cashTotal: 0};
        }
        return response.reduce(
            (totals, saleorder) => {
                totals.onlineTotal += saleorder.onlineAmount || 0;
                totals.cashTotal += saleorder.cashAmount || 0;
                totals.finalAmountTotal += saleorder.totalAmount || 0;
                
                return totals;
            },
            {onlineTotal: 0, finalAmountTotal: 0,cashTotal: 0}
        );
    }, [response]);

    return (
        <>
            <Snackbar
                open={!!snackbarAlertState.message}
                severity={snackbarAlertState.severity}
                message={snackbarAlertState.message}
                onClose={onDismiss}
            />

            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onApplyFilters)}>
                    <Stack spacing={2}>
                        <SubPanel
                            pageTitle="INCOME BY MEDICAL BILLS"
                            breadcrumbLinks={viewSalesOrdersReportBreadCrumbLinks}
                        />

                        <Stack spacing={2}>
                            <Box display="flex" justifyContent="space-between" sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        padding: '20px',
                                        borderRadius: '10px',
                                        width: '45%',
                                        marginRight: '20px',
                                        backgroundColor: WHITE_SMOKE,
                                    }}
                                >
                                    <Typography
                                        variant="appBlack"
                                        sx={{ fontSize: '15px', fontWeight: 700, marginBottom: '13px' }}
                                    >
                                        PERSONAL INFORMATION
                                    </Typography>
                                    <Divider sx={{ marginBottom: '13px' }} />
                                    <Stack spacing={2}>
                                        <FormInput
                                            name="fromDate"
                                            control={control}
                                            type="date"
                                            label="From Date"
                                            placeholder="Select a date"
                                            rules={{ required: "From Date is required" }}
                                            showNeverExpireSwitch={false}
                                            error={errors.fromDate?.message} // Display validation error
                                            helperText="Please choose a valid start date"
                                        />

                                        <FormInput
                                            name="toDate"
                                            control={control}
                                            type="date"
                                            label="To Date"
                                            placeholder="Select a date"
                                            rules={{ required: "To Date is required" }}
                                            showNeverExpireSwitch={false}
                                            error={errors.toDate?.message} // Display validation error
                                            helperText="Please choose a valid end date"
                                        />

                                                                                
                                    </Stack>
                                    
                                </Box>

                                <Box
    sx={{
        rowGap: '20px',
        minHeight: '100px',
        width: '45%',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: WHITE_SMOKE,
    }}
>
    <Typography
        variant="appBlack"
        sx={{
            fontSize: '15px',
            fontWeight: 700,
            marginTop: '13px',
            paddingLeft: '20px',
        }}
    >
        Total Income
    </Typography>
    <Divider sx={{ marginTop: '13px' }} />
    <Stack spacing={6} sx={{ marginTop: '13px', paddingLeft: '20px' }}>
        {/* Cash and Online in one row */}
        

        {/* Discount and Total in one row */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '10px',
                alignItems: 'flex-start',
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FaMobileAlt size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Online Payment"
                    value={`₹${onlineTotal.toFixed(2)}`}
                />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <HiOutlineCash size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Cash Payment"
                    value={`₹${cashTotal.toFixed(2)}`}
                />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TbReportSearch size="30px" />
                <InfoField
                    sx={{ marginLeft: '10px' }}
                    label="Total"
                    value={`₹${finalAmountTotal.toFixed(2)}`}
                />
            </Box>
        </Box>
    </Stack>
</Box>

                            </Box>
                        </Stack>

                        <Box>
                            <PageLoader
                                isLoading={isFetching}
                                isEmpty={(noData && !isError) || noData}
                                emptyMessage="No bills found"
                                Components={{ Loading: 'table' }}
                            >
                                <Table
                                    columns={salesOrdersReportTableColumns}
                                    data={response || []}
                                    totalRecords={response?.length}
                                    onPageChange={changePageNumber}
                                    pageNumber={pageNumber}
                                />
                            </PageLoader>
                        </Box>
                    </Stack>
                </form>
            </FormProvider>
        </>
    );
};

export default MedicalBills;
