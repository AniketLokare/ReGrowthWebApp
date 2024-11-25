import { ColumnDef } from '@tanstack/react-table';
import { MEDICINES } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import * as yup from 'yup';
import { object as yupObject, number, string, ObjectSchema, date } from 'yup';

export const listMedicinesBreadcrumbLinks = [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
];

export const getAddEditMedicinesBreadcrumbLinks = (isEdit = false) => [
  {
    label: 'Medicines',
    href: MEDICINES,
  },
  {
    label: isEdit ? 'Edit Medicine' :'New Medicine',
    href: '#',
  },
];

export const viewMedicineBreadCrumbLinks = [
  {
    label: 'Medicine',
    href: MEDICINES,
  },
  {
    label: 'Medicine Details',
    href: '#',
  },
];

export const medicinesTableColumns: ColumnDef<User, string>[] = [
  {
    header: 'Medicine Name',
    accessorKey: 'medicineName',
  },
  {
    header: 'Medicine Pack',
    accessorKey: 'medicinePack',
  },
  {
    header: 'Medicine Type',
    accessorKey: 'medicineType',
  },
  {
    header: 'Medicine Price',
    accessorKey: 'medicinePrice',
  },
];

export const MedicineDefaultFormValues: CreateMedicinePayload = {
  medicineName: '',
  medicinePack: 0,
  medicineType: '',
  medicinePrice: 0,
};

type CreateMedicinePayload = {
  medicineName: string;
  medicinePack?: number;
  medicineType?: string;
  medicinePrice?: number;
};

const requiredField = yup.string().required('This field is required');

export const medicineFormValidationSchema: ObjectSchema<CreateMedicinePayload> =
  yupObject({
    medicineName: requiredField,
    medicinePack: yup.number().optional().default(0),
    medicineType: yup.string().optional(),
    medicinePrice: yup.number().optional().default(0),
  });