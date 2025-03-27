import { ColumnDef } from '@tanstack/react-table';
import { EXPENSE } from 'src/constants/paths';
import { object as yupObject, number, string, ObjectSchema } from 'yup';

export const listExpensesBreadcrumbLinks = [
  {
    label: 'Expenses',
    href: EXPENSE,
  },
];

export const getAddEditBreadCrumbLinks = (isEdit = false) => [
  {
    label: 'Expenses',
    href: EXPENSE,
  },
  {
    label: isEdit ? 'Edit Expense' : 'New Expense',
    href: '#',
  },
];


export const viewExpensesBreadCrumbLinks = [
  {
    label: 'Expenses',
    href: EXPENSE,
  },
  {
    label: 'Expense Details',
    href: '#',
  },
];

export const viewExpenseReportBreadCrumbLinks = [
  {
    label: 'Reports',
    href: EXPENSE,
  },
  {
    label: 'Expenses',
    href: '#',
  },
];

export const ExpensesTableColumns: ColumnDef<Expense, string>[] = [
    {
        header: 'ID',
        accessorKey: 'expenseId',
    },
    {
    header: 'Date',
    accessorKey: 'date',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Expense Details',
    accessorKey: 'description',
  },

  {
    header: 'Online Amount',
    accessorKey: 'onlineAmount',
  },
  {
    header: 'Cash Amount',
    accessorKey: 'cashAmount',
  },

  

  {
    header: 'Total Amount',
    accessorKey: 'totalAmount',
  },
  
 
];


export const ExternalProceduresReportTableColumns: ColumnDef<ExternalProcedure, string>[] = [
    {
        header: 'ID',
        accessorKey: 'expenseId',
    },
    {
    header: 'Date',
    accessorKey: 'date',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
  {
    header: 'Expense Details',
    accessorKey: 'description',
  },

  {
    header: 'Online Amount',
    accessorKey: 'onlineAmount',
  },
  {
    header: 'Cash Amount',
    accessorKey: 'cashAmount',
  },

  

  {
    header: 'Total Amount',
    accessorKey: 'totalAmount',
  },
  
];


export const expenseCategoryProps = [
    { 
        menuItemLabel: 'Staff', 
        menuItemValue: 'Staff', 
        menuItemId: 'Staff' 
      },
    { 
      menuItemLabel: 'Rent', 
      menuItemValue: 'Rent', 
      menuItemId: 'Rent' 
    },
    { 
      menuItemLabel: 'Utilities', 
      menuItemValue: 'Utilities', 
      menuItemId: 'Utilities' 
    },
    { 
      menuItemLabel: 'Medical Supplies', 
      menuItemValue: 'Medical Supplies', 
      menuItemId: 'Medical Supplies' 
    },

    { 
        menuItemLabel: 'Pharmaceuticals', 
        menuItemValue: 'Pharmaceuticals', 
        menuItemId: 'Pharmaceuticals' 
      },

      { 
        menuItemLabel: 'Food', 
        menuItemValue: 'Food', 
        menuItemId: 'Food' 
      },

      { 
        menuItemLabel: 'Travel', 
        menuItemValue: 'Travel', 
        menuItemId: 'Travel' 
      },

      { 
        menuItemLabel: 'Other', 
        menuItemValue: 'Other', 
        menuItemId: 'Other' 
      },
  ];



export const expenseDefaultFormValues: CreateExpensePayload = {
  category: '',
  description: '',
  date: '',  
  onlineAmount: 0,
  cashAmount: 0,
  totalAmount: 0,
  
};

export const expenseFormValidationSchema: ObjectSchema<CreateExpensePayload> =
  yupObject({
    date: string()
    .required('Expense Date is Required'),
    
    category: string().required('Expense Type is required'),

    description: string().optional().default(''),
     totalAmount: number()
      .typeError('Required')
      .integer()
      .required(), 

    cashAmount: number()
      .typeError('Required')
      .integer()
      .required(),

    onlineAmount: number()
      .typeError('Required')
      .integer()
      .required(),

    
  });

