import React from 'react';
import Stack from '@mui/material/Stack';
import { FormInput } from 'src/components';
import { useFormContext } from 'react-hook-form';

const MedicineForm: React.FC = (): JSX.Element => {
  const {
    control,
    formState: { errors },

  } = useFormContext<CreateMedicinePayload>();

  return (
    <Stack spacing={4.5}>
      <FormInput
        name="medicineName"
        label="Medicine Name"
        control={control}
        placeholder="Enter Medicine name"
        error={errors.medicineName?.message}
        trim
      />

      <FormInput
        name="medicinePack"
        label="Medicine Pack number"
        control={control}
        placeholder="Enter Medicine Pack number"
        error={errors.medicinePack?.message}
        trim
      />

      <FormInput
        name="medicineType"
        label="Medicine Type"
        control={control}
        placeholder="Enter Medicine Type"
        error={errors.medicineType?.message}
        trim
      />

      <FormInput
        name="medicinePrice"
        label="Medicine Price"
        control={control}
        placeholder="Enter Medicine Price"
        error={errors.medicineType?.message}
        trim
      />
    </Stack>
  );
};

export default MedicineForm;
