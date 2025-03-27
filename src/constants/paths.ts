export const DASHBOARD_PATH = '/';

export const LOGIN = '/login';

export const UNAUTHORIZED_PATH = '/unauthorized';

export const APPOINTMENTS = '/appointments';
export const NEW_APPOINTMENT_PATH = `${APPOINTMENTS}/new`;
export const EDIT_APPOINTMENT_PATH = `${APPOINTMENTS}/:id/edit`;
export const VIEW_APPOINTMENT_PATH = `${APPOINTMENTS}/:id`;
export const APPOINTMENT_BYDATE_PATH = `${APPOINTMENTS}/by-date`;
export const getEditAppointmentRoute = (id: string) => `${APPOINTMENTS}/${id}/edit`;
export const getViewAppointmentPath = (id: string) => `${APPOINTMENTS}/${id}`;

export const PATIENTS = '/patients';
export const NEW_PATIENT_PATH = '/patients/new';
export const EDIT_PATIENT_PATH = '/patient/:id/edit';
export const VIEW_PATIENT_PATH = '/patients/:id';
export const getEditPatientRoute = (id: string) => `/patient/${id}/edit`;
export const getViewPatientPath = (id: string) => `${PATIENTS}/${id}`;

export const PROCEDURES = '/procedures';
export const EDIT_PROCEDURE_PATH = '/procedures/:id/edit';
export const VIEW_PROCEDURE_PATH = '/procedures/:id';
export const NEW_PROCEDURE_PATH = '/procedures/new';
export const getNewProcedureRoute = (id: string) => `${NEW_PROCEDURE_PATH}/${id}`;
export const getEditProcedureRoute = (id: string) => `${PROCEDURES}/${id}/edit`;
export const getViewProcedurePath = (id: string) => `${PROCEDURES}/${id}`;

export const USERS = '/users';
export const NEW_USER_PATH = '/users/new';
export const EDIT_USER_PATH = '/users/:id/edit';
export const getEditUserRoute = (id: string) => `${USERS}/${id}/edit`;

export const INVENTORY = '/inventory';

export const MEDICINES = '/medicines';
export const NEW_MEDICINE_PATH = '/medicines/new';
export const EDIT_MEDICINE_PATH = '/medicines/:id/edit';
export const getEditMedicineRoute = (id: string) => `${MEDICINES}/${id}/edit`;

export const PURCHASE_ORDERS = '/purchase-orders'; 
export const NEW_PURCHASE_PATH = '/purchase-orders/new';
export const EDIT_PURCHASE_PATH = '/purchase-orders/:id/edit';
export const VIEW_PURCHASE_PATH = '/purchase-orders/:id';
export const getEditPurchaseRoute = (id: string) => `${PURCHASE_ORDERS}/${id}/edit`;
export const getViewPurchasePath = (id: string) => `${PURCHASE_ORDERS}/${id}`;

export const PURCHASE_TRANSACTIONS = '/purchase-transaction'; 
export const EDIT_PURCHASE_TRANSACTIONS_PATH = '/purchase-transaction/:id/edit';
export const VIEW_PURCHASE_TRANSACTIONS_PATH = '/purchase-transaction/:id';
export const NEW_PURCHASE_TRANSACTIONS_PATH = '/purchase-transaction/new';
export const getNewPurchaseTransactionRoute = (id: string) => `${NEW_PURCHASE_TRANSACTIONS_PATH}/${id}`;

export const getEditPurchaseTransactionRoute = (id: string) => `${PURCHASE_TRANSACTIONS}/${id}/edit`;
export const getViewPurchaseTransactionPath = (id: string) => `${PURCHASE_TRANSACTIONS}/${id}`;


export const SALES_ORDERS = '/sales-orders';
export const NEW_SALES_PATH = '/sales-orders/new';
export const EDIT_SALE_PATH = '/sales-orders/:id/edit';
export const VIEW_SALE_PATH = '/sales-orders/:id';
export const getEditSaleRoute = (id: string) => `${SALES_ORDERS}/${id}/edit`;
export const getViewSalePath = (id: string) => `${SALES_ORDERS}/${id}`;

export const SALES_TRANSACTIONS = '/sales-transaction'; 
export const EDIT_SALES_TRANSACTIONS_PATH = '/sales-transaction/:id/edit';
export const VIEW_SALES_TRANSACTIONS_PATH = '/sales-transaction/:id';
export const NEW_SALES_TRANSACTIONS_PATH = '/sales-transaction/new';
export const PRINT_BILL = '/sales-transaction/print-bill';

export const getNewSalesTransactionRoute = (id: string) => `${NEW_SALES_TRANSACTIONS_PATH}/${id}`;

export const getEditSalesTransactionRoute = (id: string) => `${SALES_TRANSACTIONS}/${id}/edit`;
export const getViewSalesTransactionPath = (id: string) => `${SALES_TRANSACTIONS}/${id}`;



export const SUPPLIERS = '/suppliers';
export const NEW_SUPPLIER_PATH = '/suppliers/new';
export const EDIT_SUPPLIER_PATH = '/suppliers/:id/edit';
export const getEditSupplierRoute = (id: string) => `${SUPPLIERS}/${id}/edit`;

export const EXTERNAL_PROCEDURE = '/external-procedures';
export const EDIT_EXTERNAL_PROCEDURE_PATH = '/external-procedures/:id/edit';
export const VIEW_EXTERNAL_PROCEDURE_PATH = '/external-procedures/:id';
export const NEW_EXTERNAL_PROCEDURE_PATH = '/external-procedures/new';
export const getNewExternalProcedureRoute = (id: string) => `${NEW_EXTERNAL_PROCEDURE_PATH}/${id}`;
export const getEditExternalProcedureRoute = (id: string) => `${EXTERNAL_PROCEDURE}/${id}/edit`;
export const getViewExternalProcedurePath = (id: string) => `${EXTERNAL_PROCEDURE}/${id}`;

export const EXPENSE = '/expense';
export const EDIT_EXPENSE_PATH = '/expense/:id/edit';
export const VIEW_EXPENSE_PATH = '/expense/:id';
export const NEW_EXPENSE_PATH = '/expense/new';
export const getNewExpenseRoute = (id: string) => `${NEW_EXPENSE_PATH}/${id}`;
export const getEditExpenseRoute = (id: string) => `${EXPENSE}/${id}/edit`;
export const getViewExpensePath = (id: string) => `${EXPENSE}/${id}`;




export const REPORTS = '/reports';
export const CLINIC_PROCEDURE_REPORT = '/income-by-procedures';
export const EXTERNAL_PROCEDURE_REPORT = '/income-by-externalprocedures';
export const MEDICAL_BILL_REPORT = '/income-by-medicalbills';
export const MEDICAL_BILL_MEDICINES_REPORT = '/income-by-medicines';

