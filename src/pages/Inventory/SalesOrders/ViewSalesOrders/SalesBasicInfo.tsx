import React, { useMemo } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  InfoField,
  ErrorBoundary,
  PageLoader,
  Table,
  TableError,
  Button,
  Snackbar,
  LoadingBackdrop,
  ConfirmationModal,
  Actions,
} from "src/components";
import { useNavigate, useParams } from 'react-router-dom';
import { WHITE_SMOKE } from "src/constants/colors";
import { useGetMedicinesListBySaleOrderId } from "src/hooks/useSalesOrder";

import useDeleteConfirmationModal from "src/hooks/useDelete";
import useSnackbarAlert from "src/hooks/useSnackbarAlert";
import { usePagination } from "src/hooks/usePagination";
import { SalesTransactionTableColumns } from "../SalesTransactions/constants";
import jsPDF from "jspdf"; // ✅ Import jsPDF
import autoTable from "jspdf-autotable";

import {
  NEW_SALES_TRANSACTIONS_PATH,
  getEditSalesTransactionRoute,
  getNewSalesTransactionRoute
} from 'src/constants/paths';
import { deleteSalesTransaction, useDeleteSalesTransaction } from 'src/hooks/useSalesTransaction';



(jsPDF as any).prototype.autoTable = autoTable;


interface SalesBasicInfoProps {
  salesOrderDetails?: SaleOrder;
}

const SalesBasicInfo: React.FC<SalesBasicInfoProps> = ({ salesOrderDetails }): JSX.Element => {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { pageNumber, changePageNumber } = usePagination();
  const { snackbarAlertState, onDismiss, setSnackbarAlertState } = useSnackbarAlert();

  // ✅ Fetch Medicines List
  
  const { response:medicines, isFetching, refetch } = useGetMedicinesListBySaleOrderId(id, {
    apiConfig: {
      params: {
        _page: pageNumber,
      },
    },
  });

  const downloadPDF = () => {
    if (!salesOrderDetails || !medicines) return;

    const doc = new jsPDF();

    // Header with Company Brand and Invoice
    doc.autoTable({
      body: [
        [
          { content: "Regrowth", styles: { halign: "left", fontSize: 20, textColor: "#ffffff" } },
          { content: "Invoice", styles: { halign: "right", fontSize: 20, textColor: "#ffffff" } },
        ],
      ],
      theme: "plain",
      styles: { fillColor: "#3366ff" },
    });

    // Invoice Details
    doc.autoTable({
      body: [[{ content: `Date: ${salesOrderDetails.billDate}\nInvoice number: ${salesOrderDetails.billId}`, styles: { halign: "right" } }]],
      theme: "plain",
    });

    // Billed to & From Section
    doc.autoTable({
      body: [
        [
          {
            content: `Billed to:\nName: ${salesOrderDetails.patientName}\nPatientId: ${salesOrderDetails.patientId}`,
            styles: { halign: "left" },
          },
          {
            content: "From:\nDr.Ajay Mohite\nRegrowth Hair Transplant\n& Oral Surgery Clinic\nSadar Bazar, Satara\nSatara-415001",
            styles: { halign: "right" },
          },
        ],
      ],
      theme: "plain",
    });

    // Round the total amount
// Safely round the total amount, default to 0 if undefined
const roundedTotalAmount = Math.round(salesOrderDetails.totalAmount ?? 0);


// Total Amount
doc.autoTable({
  body: [
    [{ content: "Total Amount:", styles: { halign: "right", fontSize: 14 } }],
    [{ content: `Rs.${roundedTotalAmount}`, styles: { halign: "right", fontSize: 20, textColor: "#3366ff" } }],
  ],
  theme: "plain",
});




    // Products & Services Section
    doc.autoTable({ body: [[{ content: "Medicines", styles: { halign: "left", fontSize: 14 } }]], theme: "plain" });

    // Products Table
    const tableColumn = ["Items", "Quantity", "Amount"];
    const tableRows = medicines?.content.map((med) => [med.medName, med.medQuantity || "N/A", med.totalAmount]) || [];

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: "#343a40" },
    });

    // Total Amount Summary
    // Total Amount Summary
doc.autoTable({
  body: [
    [{ content: "Total amount:", styles: { halign: "right" } }, { content: `Rs.${roundedTotalAmount}`, styles: { halign: "right" } }],
  ],
  theme: "plain",
});


     // Terms & Notes
     doc.autoTable({
      body: [
         [
          {
            content:
              "Notes:\nMedications provided are dispensed strictly as per the doctor's prescription. Do not discontinue, modify, or exceed the prescribed dosage without consulting your physician. The clinic is not responsible for any adverse effects due to non-compliance with medical advice\n\n\n\n ***This is computer generated invoice no signature required.",
              styles: { halign: "left",fontStyle: "italic"},
          },
        ],
      ],
      theme: "plain",
    });

    // Get last position
    // const finalY = (doc as any).lastAutoTable?.finalY || 0;

    // const pageHeight = doc.internal.pageSize.height;
    // const termsStartY = pageHeight - 40; // 40px from bottom

    // // Add a new page if needed
    // if (finalY + 30 > termsStartY) {
    //   doc.addPage();
    // }

    // // Terms & Notes at Bottom
    // doc.autoTable({
    //   startY: termsStartY,
    //   body: [
        
    //     [
    //       {
    //         content:
    //           "Notes:\nMedications provided are dispensed strictly as per the doctor's prescription. Do not discontinue, modify, or exceed the prescribed dosage without consulting your physician. The clinic is not responsible for any adverse effects due to non-compliance with medical advice",
    //         styles: { halign: "left",fontStyle: "italic"},
    //       },
    //     ],
    //   ],
    //   theme: "plain",
    // });

    // Footer at Bottom


    // Save PDF
    doc.save(`Medical_Bill_${salesOrderDetails.patientName}.pdf`);
  };


  const { mutate: deletePurchaseTransaction, isPending: isDeleteInProgress } =
  useDeleteSalesTransaction({
    onSuccess: () => {
      setSnackbarAlertState({
        severity: 'success',
        title: 'Medicine Transaction Deleted.',
        message: `Medicine transaction "${deleteConfirmationModalValues?.name}" deleted successfully.`,
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
  deleteConfirmationModalValues,
  onDeleteConfirm,
  showDeleteConfirmationModal,
  onShowDeleteConfirmationModal,
  onClose,
} = useDeleteConfirmationModal({ onDelete: deleteSalesTransaction });

const salesTransactionTableColumnsWithActions = useMemo(
  () => [
    ...SalesTransactionTableColumns,
    {
      header: 'Actions',
      id: 'actions',
      cell: ({ row }) => {
        const salesTransactionValues = row.original;
        return (
          <Actions
            onEditClick={() => {
                            navigate(getEditSalesTransactionRoute(salesTransactionValues.billTransactionId.toString()));
                          }}
            onDeleteClick={() => {
              onShowDeleteConfirmationModal(
                salesTransactionValues.billTransactionId.toString(),
                salesTransactionValues.medName || 'No Medicine Name'
              );
            }}
          />
        );
      },
    },
  ],
  []
);




  return (
    <Stack spacing={6}>
      <LoadingBackdrop loading={isFetching} />
      <Snackbar open={!!snackbarAlertState.message} severity={snackbarAlertState.severity} message={snackbarAlertState.message} onClose={onDismiss} />

      {/* Order Details Section */}
      <Stack spacing={2}>
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", backgroundColor: WHITE_SMOKE, padding: "20px", borderRadius: "10px" }}>
          <InfoField label="Patient Name" value={salesOrderDetails?.patientName || "N/A"} />
          <InfoField label="Bill Date" value={salesOrderDetails?.billDate || "N/A"} />
          <InfoField label="Online Payment" value={`₹ ${salesOrderDetails?.onlineAmount || 0}`} />
          <InfoField label="Cash Payment" value={`₹ ${salesOrderDetails?.cashAmount || 0}`} />
          <InfoField label="Total Cost" value={`₹ ${salesOrderDetails?.totalAmount || 0}`} />
        </Box>
      </Stack>

      {/* Medicines List Section */}
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="appBlack" sx={{ fontSize: "23px", fontWeight: 700, marginTop: "13px" }}>
            Medicines List
          </Typography>
          {/* Download PDF Button */}
          <Button variant="outlined" sx={{ padding: "20px" }} onClick={downloadPDF}>
            Download Bill
          </Button>
        </Box>

        <ErrorBoundary fallbackComponent={TableError}>
          <PageLoader isLoading={isFetching} Components={{ Loading: "table" }} emptyMessage="No Medicines Found">
            <Table columns={salesTransactionTableColumnsWithActions} data={medicines?.content || []} totalRecords={medicines?.items || 0} onPageChange={changePageNumber} pageNumber={pageNumber} />
          </PageLoader>
        </ErrorBoundary>
      </Box>

      <ConfirmationModal onClose={() => { }} onSubmit={() => { }} open={false} />
    </Stack>
  );
};

export default SalesBasicInfo;
