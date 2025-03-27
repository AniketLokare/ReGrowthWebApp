import React, { useState, useMemo } from 'react';
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
import { viewSalesOrdersReportBreadCrumbLinks, SalesTransactionReportTableColumns } from '../../Inventory/SalesOrders/SalesTransactions/constants';
import { WHITE_SMOKE } from 'src/constants/colors';
import { useGetFilteredBills } from 'src/hooks/useSalesTransaction';
import { usePagination } from 'src/hooks/usePagination';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { format } from 'date-fns';
import jsPDF from "jspdf";
import "jspdf-autotable";

const BillMedicines: React.FC = (): JSX.Element => {
    const { snackbarAlertState, setSnackbarAlertState, onDismiss } = useSnackbarAlert();
    const { pageNumber, changePageNumber } = usePagination();


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


    const handleDownloadPDF = () => {
        const doc = new jsPDF();
    
        // Header
        doc.setFillColor(33, 150, 243);
        doc.rect(0, 0, 210, 15, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(18);
        doc.setFont("helvetica", "bold");
        doc.text("Regrowth", 14, 10);
        doc.text("Report", 180, 10, { align: "right" });
    
        doc.setTextColor(0, 0, 0);
        let startY = 25;
    
        // Date Range
        doc.autoTable({
            startY,
            body: [[{ content: `From Date: ${watch("fromDate")}\nTo Date: ${watch("toDate")}`, styles: { halign: "right" } }]],
            theme: "plain",
        });
    
        startY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : startY;
    
        // Calculate Total Quantity per Medicine
        const medicineTotals = response.reduce<Record<number, { medicineName: string; quantity: number }>>(
            (totals, salesTransaction) => {
                const { medicineNumber, medName, medQuantity = 0 } = salesTransaction;
    
                if (!totals[medicineNumber]) {
                    totals[medicineNumber] = {
                        medicineName: medName,
                        quantity: 0,
                    };
                }
    
                // Accumulate quantity
                totals[medicineNumber].quantity += medQuantity;
                return totals;
            },
            {}
        );
    
        // Total Quantity Table (Above All Medicines List)
        const summaryRows = Object.entries(medicineTotals).map(([medNumber, { medicineName, quantity }]) => [
            medNumber,
            medicineName,
            quantity,
        ]);
    
        doc.autoTable({
            startY,
            head: [["Medicine ID", "Medicine Name", "Total Quantity"]],
            body: summaryRows,
            theme: "grid",
        });
    
        startY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : startY;
    
        // Total Amount Section
        const roundedTotalAmount = Math.round(finalAmountTotal ?? 0);
        doc.autoTable({
            startY,
            body: [
                [{ content: "Total Amount:", styles: { halign: "right", fontSize: 14 } }],
                [{ content: `Rs.${roundedTotalAmount}`, styles: { halign: "right", fontSize: 20, textColor: "#3366ff" } }],
            ],
            theme: "plain",
        });
    
        startY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 10 : startY;
    
        // All Medicines List Table
        const tableColumn = ["Sr No", "Bill No", "Med Name", "Quantity", "Total Amount"];

const tableRows = response.map((bill, index) => [
    index + 1,              // Add Sr No (starts from 1)
    bill.billNumber,    
    bill.medName,
    bill.medQuantity,
    bill.totalAmount,
]);

doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY,
});
    
        // Save PDF
        doc.save("Sold_Medicines_Report.pdf");
    };
    
    

    // Make sure to call this function when clicking the 'Print Report' button
    // <Button onClick={handleDownloadPDF}>Print Report</Button>

    // Let me know if you need any adjustments or more features added! ✌️


    // Let me know if you want any adjustments! 🚀





    const { finalAmountTotal } = useMemo(() => {
        if (!response || response.length === 0) {
            return { finalAmountTotal: 0 };
        }
        return response.reduce(
            (totals, salestransaction) => {

                totals.finalAmountTotal += salestransaction.totalAmount || 0;

                return totals;
            },
            { finalAmountTotal: 0 }
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
                            pageTitle="SOLD MEDICINES REPORT"
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
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                margin: '10px',
                                                alignItems: 'flex-start',
                                            }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <TbReportSearch size="30px" />
                                                <InfoField
                                                    sx={{ marginLeft: '10px' }}
                                                    label="Total"
                                                    value={`₹${finalAmountTotal.toFixed(2)}`}
                                                />
                                            </Box>

                                            {/* Print Report Button */}
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleDownloadPDF}
                                                sx={{ height: '40px' }}
                                            >
                                                Print Report
                                            </Button>
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
                                    columns={SalesTransactionReportTableColumns}
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

export default BillMedicines;
