import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import {
  DASHBOARD_PATH,
  EDIT_PATIENT_PATH,
  INVENTORY,
  LOGIN,
  MEDICINES,
  NEW_PATIENT_PATH,
  PATIENTS,
  PROCEDURES,
  EDIT_PROCEDURE_PATH,
  VIEW_PATIENT_PATH,
  VIEW_PROCEDURE_PATH,
  USERS,
  NEW_USER_PATH,
  EDIT_USER_PATH,
  NEW_MEDICINE_PATH,
  EDIT_MEDICINE_PATH,
  SUPPLIERS,
  NEW_SUPPLIER_PATH,
  EDIT_SUPPLIER_PATH,

  PURCHASE_ORDERS,
  NEW_PURCHASE_PATH,
  VIEW_PURCHASE_PATH,
  EDIT_PURCHASE_PATH,
  PURCHASE_TRANSACTIONS,
  NEW_PURCHASE_TRANSACTIONS_PATH,
  EDIT_PURCHASE_TRANSACTIONS_PATH,
  UNAUTHORIZED_PATH,
  SALES_ORDERS,
  NEW_SALES_PATH,
  EDIT_SALE_PATH,
  VIEW_SALE_PATH,
  PRINT_BILL,

  SALES_TRANSACTIONS,
  NEW_SALES_TRANSACTIONS_PATH,
  EDIT_SALES_TRANSACTIONS_PATH,
  APPOINTMENTS,
  NEW_PROCEDURE_PATH,
  NEW_APPOINTMENT_PATH,
  APPOINTMENT_BYDATE_PATH,
  EDIT_APPOINTMENT_PATH,
  VIEW_APPOINTMENT_PATH,
  EXTERNAL_PROCEDURE,
  NEW_EXTERNAL_PROCEDURE_PATH,
  EDIT_EXTERNAL_PROCEDURE_PATH,
  VIEW_EXTERNAL_PROCEDURE_PATH,

  CLINIC_PROCEDURE_REPORT,
  EXTERNAL_PROCEDURE_REPORT,
  MEDICAL_BILL_REPORT,
  MEDICAL_BILL_MEDICINES_REPORT,

  EXPENSE,
  NEW_EXPENSE_PATH,
  EDIT_EXPENSE_PATH,
  VIEW_EXPENSE_PATH,
} from './constants/paths';
import Login from './pages/Login';
import ProtectedRoute from './pages/Login/ProtectedRoute';
import Patients from './pages/Patients';
import Procedures from './pages/Procedures';
import Medicines from './pages/Medicines';
import Inventory from './pages/Inventory';
import AddEditPatient from './pages/Patients/AddEdit';
import ViewPatient from './pages/Patients/ViewPatient';
import ViewProcedure from './pages/Procedures/ViewProcedure';
import AddEditProcedure from './pages/Procedures/AddEdit';
import Users from './pages/Users';
import AddEditUser from './pages/Users/AddEdit';
import AddEditMedicine from './pages/Medicines/AddEdit';
import Suppliers from './pages/Inventory/Suppliers';
import AddEditSupplier from './pages/Inventory/Suppliers/AddEdit';
import PurchaseOrders from './pages/Inventory/PurchaseOrders';
import AddEditPurchase from './pages/Inventory/PurchaseOrders/AddEdit';
import ViewPurchase from './pages/Inventory/PurchaseOrders/ViewPurchaseOrders';
import AddEditPurchaseTransactions from './pages/Inventory/PurchaseOrders/PurchaseTransactions/AddEdit';
import SalesOrders from './pages/Inventory/SalesOrders';
import AddEditSales from './pages/Inventory/SalesOrders/AddEdit';
import ViewSales from './pages/Inventory/SalesOrders/ViewSalesOrders';
import AddEditSalesTransactions from './pages/Inventory/SalesOrders/SalesTransactions/AddEdit';
import PrintBill from './pages/Inventory/SalesOrders/printbill';



import Appointments from './pages/Appointments';
import AddEditAppointment from './pages/Appointments/AddEdit';
import ByDateAppointment from './pages/Appointments/ByDate';
import ViewAppointment from './pages/Appointments/ViewAppointment';
import ExternalProcedures from './pages/ExternalProcedures';
import AddEditExternalProcedure from './pages/ExternalProcedures/AddEdit';
import ViewExternalProcedure from './pages/ExternalProcedures/ViewExternalProcedures';
import Unauthorized from './pages/Unauthorized';

import Expense from './pages/Expense';
import AddEditExpense from './pages/Expense/AddEdit';
import ViewExpense from './pages/Expense/ViewExpenses';


import ClinicProceduresReport from './pages/Reports/ClinicProcedures';
import ExternalProceduresReport from './pages/Reports/ExternalProcedures';
import MedicalBills from './pages/Reports/MedicalBills';
import BillMedicines from './pages/Reports/BillMedicines';




const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={LOGIN} element={<Login />} />
    <Route path={UNAUTHORIZED_PATH} element={<Unauthorized />} />
    
    <Route element={<ProtectedRoute />}>
      <Route path={DASHBOARD_PATH} element={<Dashboard />} />

      <Route path={APPOINTMENTS} element={<Appointments />} />
      <Route path={NEW_APPOINTMENT_PATH} element={<AddEditAppointment />} />
      <Route path={EDIT_APPOINTMENT_PATH} element={<AddEditAppointment />} />
      <Route path={VIEW_APPOINTMENT_PATH} element={<ViewAppointment />} />
      <Route path={APPOINTMENT_BYDATE_PATH} element={<ByDateAppointment />} />

      <Route path={PATIENTS} element={<Patients />} />
      <Route path={NEW_PATIENT_PATH} element={<AddEditPatient />} />
      <Route path={EDIT_PATIENT_PATH} element={<AddEditPatient />} />
      <Route path={VIEW_PATIENT_PATH} element={<ViewPatient />} />

      <Route path={PROCEDURES} element={<Procedures />} />
      <Route path={NEW_PROCEDURE_PATH} element={<AddEditProcedure />} />
      <Route path={EDIT_PROCEDURE_PATH} element={<AddEditProcedure />} />
      <Route path={VIEW_PROCEDURE_PATH} element={<ViewProcedure />} />

      <Route path={INVENTORY} element={<Inventory />} />

      <Route path={MEDICINES} element={<Medicines />} />
      <Route path={NEW_MEDICINE_PATH} element={<AddEditMedicine />} />
      <Route path={EDIT_MEDICINE_PATH} element={<AddEditMedicine />} />

      <Route path={PURCHASE_ORDERS} element={<PurchaseOrders />} />
      <Route path={NEW_PURCHASE_PATH} element={<AddEditPurchase />} />
      <Route path={EDIT_PURCHASE_PATH} element={<AddEditPurchase />} />
      <Route path={VIEW_PURCHASE_PATH} element={<ViewPurchase />} />
      <Route path={NEW_PURCHASE_TRANSACTIONS_PATH} element={<AddEditPurchaseTransactions />} />
      <Route path={EDIT_PURCHASE_TRANSACTIONS_PATH} element={<AddEditPurchaseTransactions />} />
      
      <Route path={SALES_ORDERS} element={<SalesOrders />} />
      <Route path={NEW_SALES_PATH} element={<AddEditSales />} />
      <Route path={EDIT_SALE_PATH} element={<AddEditSales />} />
      <Route path={VIEW_SALE_PATH} element={<ViewSales />} />
      <Route path={NEW_SALES_TRANSACTIONS_PATH} element={<AddEditSalesTransactions />} />
      <Route path={EDIT_SALES_TRANSACTIONS_PATH} element={<AddEditSalesTransactions />} />
      <Route path={PRINT_BILL} element={<PrintBill/>}/>
      

      <Route path={SUPPLIERS} element={<Suppliers />} />
      <Route path={NEW_SUPPLIER_PATH} element={<AddEditSupplier />} />
      <Route path={EDIT_SUPPLIER_PATH} element={<AddEditSupplier />} />

      <Route path={EXTERNAL_PROCEDURE} element={<ExternalProcedures />} />
      <Route path={NEW_EXTERNAL_PROCEDURE_PATH} element={<AddEditExternalProcedure />} />
      <Route path={EDIT_EXTERNAL_PROCEDURE_PATH} element={<AddEditExternalProcedure />} />
      <Route path={VIEW_EXTERNAL_PROCEDURE_PATH} element={<ViewExternalProcedure />} />

      <Route path={EXPENSE} element={<Expense />} />
      <Route path={NEW_EXPENSE_PATH} element={<AddEditExpense />} />
      <Route path={EDIT_EXPENSE_PATH} element={<AddEditExpense />} />
      <Route path={VIEW_EXPENSE_PATH} element={<ViewExpense />} />

      <Route path={USERS} element={<Users />} />
      <Route path={NEW_USER_PATH} element={<AddEditUser />} />
      <Route path={EDIT_USER_PATH} element={<AddEditUser />} />

      <Route path={CLINIC_PROCEDURE_REPORT} element={<ClinicProceduresReport />} />
      <Route path={EXTERNAL_PROCEDURE_REPORT} element={<ExternalProceduresReport />} />
      <Route path={MEDICAL_BILL_REPORT} element={<MedicalBills />} />
      <Route path={MEDICAL_BILL_MEDICINES_REPORT} element={<BillMedicines/>} />
    </Route>
  </Routes>
);

export default AppRoutes;
