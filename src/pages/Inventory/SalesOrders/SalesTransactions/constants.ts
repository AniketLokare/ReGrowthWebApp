import { ColumnDef } from '@tanstack/react-table';
import { SALES_ORDERS } from 'src/constants/paths';
import { requiredField } from 'src/constants/validationSchema';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

// Breadcrumb Links
export const listSalesTransactionsBreadcrumbLinks = [
  {
    label: 'Sales Orders',
    href: SALES_ORDERS,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Sales Orders',
    href: SALES_ORDERS,
  },
  {
    label: isEdit ? 'Edit Medicine' : 'New Medicine',
    href: '#',
  },
];

export const viewSalesTransactionBreadCrumbLinks = [
  {
    label: 'Bills',
    href: SALES_ORDERS,
  },
  {
    label: 'Bill Transaction Details',
    href: '#',
  },
];

export const viewSalesOrdersReportBreadCrumbLinks = [
  {
    label: 'Reports',
    href: SALES_ORDERS,
  },
  {
    label: 'Bills',
    href: '#',
  },
];



export const SalesTransactionTableColumns: ColumnDef<SalesTransaction, string>[] = [
    {
      header: 'Transaction ID',
      accessorKey: 'billTransactionId',
    },
    
    {
      header: 'Medicine Name',
      accessorKey: 'medName',
    },
    {
      header: 'Medicine Batch',
      accessorKey: 'medicineBatch',
    },
    {
      header: 'Quantity',
      accessorKey: 'medQuantity',
    },
    {
      header: 'MRP',
      accessorKey: 'medMrp',
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
    },
    
   
  ];


  export const SalesTransactionReportTableColumns: ColumnDef<SalesTransaction, string>[] = [
    {
      header: 'Transaction ID',
      accessorKey: 'billTransactionId',
    },
    
    {
      header: 'Medicine Name',
      accessorKey: 'medName',
    },
    {
      header: 'Medicine Batch',
      accessorKey: 'medicineBatch',
    },
    {
      header: 'Quantity',
      accessorKey: 'medQuantity',
    },
    {
      header: 'MRP',
      accessorKey: 'medMrp',
    },
    {
      header: 'Total Amount',
      accessorKey: 'totalAmount',
    },
    
   
  ];
  
  // Default Form Values
  export const salesTransactionDefaultFormValues: CreateSaleTransactionPayload = {
    medName: '',
    medQuantity: 0,
    medMrp: 0,
    medtransactionId: 0,
    medicineBatch: '',
    totalAmount: 0,
    billNumber: 0,
    medicineNumber: 0,
  };
  
  // Form Validation Schema
  export const salesTransactionFormValidationSchema: ObjectSchema<CreateSaleTransactionPayload> =
    yupObject({
      medName: string().required('Required'),
      medQuantity: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid quantity')
        .integer(),
      medMrp: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid value'),
      medtransactionId: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid value')
        .integer(),
      medicineBatch: string().required('Required'),
      totalAmount: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid value'),
      billNumber: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid value')
        .integer(),
      medicineNumber: number()
        .typeError('Required')
        .required('Required')
        .positive('Invalid value')
        .integer(),
    });
