import React, { useMemo } from 'react';
import Stack from '@mui/material/Stack';
import { useFormContext, Controller } from 'react-hook-form';
import { Autocomplete, TextField } from '@mui/material';
import { useGetPatientList } from 'src/hooks/usePatients';
import { FormInput } from 'src/components';

interface SalesOrderFormProps {
  isEdit: boolean;
}

const SalesOrderForm: React.FC<SalesOrderFormProps> = ({ isEdit }) => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext<CreateSalePayload>();

  const { response, isFetching, error } = useGetPatientList({
    apiConfig: { params: {} }, // Ensure params exist
  });

  // Use full patient objects as options
  const patientOptions = useMemo(() => response?.content || [], [response]);

  return (
    <Stack spacing={4.5}>
      <Controller
  name="patientName"
  control={control}
  render={({ field }) => (
    <Autocomplete
      {...field}
      options={patientOptions.map(
        (patient) =>
          `${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.trim()
      )}
      loading={isFetching}
      onChange={(_, value) => {
        setValue('patientName', value || '',{shouldDirty: true});

        const selectedPatient = response?.content?.find(
          (patient) =>
            `${patient.firstName} ${patient.middleName || ''} ${patient.lastName}`.trim() ===
            value
        );
        if (selectedPatient) {
          setValue('patientId', Number(selectedPatient.patientId),{shouldDirty: true});
        } 
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Patient Name"
          placeholder="Select patient name"
          error={!!errors.patientName?.message}
          helperText={
            errors.patientName?.message || (error && 'Failed to load patients.')
          }
        />
      )}
    />
  )}
/>

      <FormInput
        type="date"
        name="billDate"
        label="Bill Date"
        control={control}
        error={errors.billDate?.message}
      />
      <FormInput
        name="patientId"
        label="Patient ID"
        control={control}
        disabled
        placeholder="Patient ID"
        error={errors.patientId?.message}
      />

{isEdit && (
  <>
    <FormInput
      type="number"
      name="onlineAmount"
      label="Online Amount"
      control={control}
      placeholder="Enter Online Amount"
      error={errors.onlineAmount?.message}
      trim
    />

    <FormInput
      type="number"
      name="cashAmount"
      label="Cash Amount"
      control={control}
      placeholder="Enter Cash Amount"
      error={errors.cashAmount?.message}
      trim
    />

    <FormInput
      type="number"
      name="totalAmount"
      label="Total Amount"
      control={control}
      placeholder="Enter Total Amount"
      error={errors.totalAmount?.message}
      trim
    />
  </>
)}

    </Stack>
  );
};

export default SalesOrderForm;
