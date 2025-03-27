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
import { useGetProcedureDetail, useDeleteProcedure } from 'src/hooks/useProcedures';
import { useGetPatientDetail } from 'src/hooks/usePatients';
import { viewProceduresBreadCrumbLinks } from '../constants';
import ProcedureBasicInfo from './ProcedureBasicInfo';
import { ERROR_RED } from 'src/constants/colors';
import useSnackbarAlert from 'src/hooks/useSnackbarAlert';
import { getEditProcedureRoute, PROCEDURES } from 'src/constants/paths';
import useDeleteConfirmationModal from 'src/hooks/useDelete';
import jsPDF from "jspdf"; // ✅ Import jsPDF
import autoTable from "jspdf-autotable";

(jsPDF as any).prototype.autoTable = autoTable;

const ViewProcedure: React.FC = (): JSX.Element => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isFetching, response } = useGetProcedureDetail({
    id,
  });

  // Extract patientId from procedure details
  const patientId = response?.patientId ? response.patientId.toString() : ""; // Ensure it's a string

const { data: patientDetails } = useGetPatientDetail({ id: patientId, apiConfig: {} });


  const { snackbarAlertState, onDismiss, setSnackbarAlertState } =
    useSnackbarAlert();

  const onEditProcedure = () => {
    navigate(getEditProcedureRoute(id));
  };


  const numberToWords = (num: number): string => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
    ];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
    const convertBelowThousand = (n: number): string => {
      if (n === 0) return "";
      else if (n < 20) return a[n] + " ";
      else if (n < 100) return b[Math.floor(n / 10)] + " " + a[n % 10] + " ";
      else return a[Math.floor(n / 100)] + " Hundred " + convertBelowThousand(n % 100);
    };
  
    if (num === 0) return "Zero";
    let word = "";
    if (num >= 1000) word += convertBelowThousand(Math.floor(num / 1000)) + "Thousand ";
    word += convertBelowThousand(num % 1000);
    
    return word.trim();
  };
  
  const downloadPDF = () => {
    const doc = new jsPDF();

    
  
    doc.setFillColor(33, 150, 243);
    doc.rect(0, 0, 210, 15, "F"); // Header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Regrowth", 14, 10);
    doc.text("Invoice", 180, 10, { align: "right" });
  
    doc.setTextColor(0, 0, 0);
    let startY = 25;
  
    // Patient & Clinic Details
    doc.autoTable({
      startY,
      body: [[{ content: `Date: ${response?.procedureDate}\nInvoice number: ${response?.procedureId}`, styles: { halign: "right" } }]],
      theme: "plain",
    });

    // Extract patient details
  const patientFullName = `${patientDetails?.firstName || ""} ${patientDetails?.middleName || ""} ${patientDetails?.lastName || ""}`.trim();
  const patientGender = patientDetails?.patientGender || "N/A";
  const patientAge = patientDetails?.patientAge ? `${patientDetails.patientAge} years` : "N/A";
  const patientMobile1 = patientDetails?.patientMobile1 || "N/A";
  
    // Billed to & From Section
    doc.autoTable({
      startY: 45,
      body: [
        [
          {
            content: `Billed to:\nName: ${patientFullName}\nAge: ${patientAge} (${patientGender})\nMobile: ${patientMobile1}`,
            styles: { halign: "left", fontSize: 12 },
          },
          {
            content: "From:\nDr.Ajay Mohite\nRegrowth Hair Transplant\n& Oral Surgery Clinic\nSadar Bazar, Satara\nSatara-415001",
            styles: { halign: "right", fontSize: 12 },
          },
        ],
      ],
      theme: "plain",
    });
  
    // Invoice Table
    doc.autoTable({
      startY: 90,
      head: [["Procedure Type", "Procedure Detail", "Amount (Rs)"]],
      body: [[response?.procedureType, response?.procedureDetail || "N/A", response?.finalAmount]],
      theme: "grid",
    });
  
    // Convert total amount to words
    const totalAmount = response?.totalAmount || 0;
    const amountInWords = numberToWords(totalAmount);
  
    // Total Amount Section
    doc.autoTable({
      startY: 120,
      body: [
        [{ content: `Total Amount: Rs. ${totalAmount}`, styles: { halign: "right", fontSize: 12,fontStyle: "italic" } }],
        [{ content: `Amount in Words: ${amountInWords} Rupees Only`, styles: { halign: "right", fontSize: 12, fontStyle: "italic" } }],
      ],
      theme: "plain",
    });
  
    // Footer
    doc.setFillColor(33, 150, 243);
    doc.rect(0, 280, 210, 20, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Regrowth", 14, 287);
    doc.setFontSize(10);
    doc.text("Regrowth Hair Transplant & Oral Surgery Clinic", 14, 293);
    doc.setFontSize(9);
    doc.text(
      "For any concerns or queries please contact us on\n02162-299606 / 8605002563 / drajaymohite555@gmail.com",
      196,
      285,
      { align: "right" } as any
    );
  
    doc.save(`Invoice_${response?.patientId}.pdf`);
  };
  

  const { mutate: deleteProcedure, isPending: isDeleteInProgress } =
    useDeleteProcedure({
      onSuccess: () => {
        navigate(PROCEDURES, {
          state: {
            alert: {
              severity: 'success',
              title: 'Procedure Deleted.',
              message: `Procedure "${deleteConfirmationModalValues?.name}" is deleted successfully.`,
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
  } = useDeleteConfirmationModal({ onDelete: deleteProcedure });

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
        pageTitle="PROCEDURE DETAILS"
        breadcrumbLinks={viewProceduresBreadCrumbLinks}
        rightSideButtonText="Print Bill"
        rightSideButtonClickEvent={(downloadPDF)}
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
                Patient Id: {response?.patientId}
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
                onClick={onEditProcedure}
                startIcon={<Icon icon="edit" size="15" />}
                sx={{ marginRight: '20px' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                onClick={() =>
                  onShowDeleteConfirmationModal(
                    response?.procedureId.toString() || '',
                    response?.procedureDetail || '',
                  )
                }
                startIcon={<Icon icon="trash" size="15" />}
                sx={{ backgroundColor: ERROR_RED }}
              >
                Delete
              </Button>
            </Box>
          </Box>
          <ProcedureBasicInfo procedureDetails={response} />
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

export default ViewProcedure;