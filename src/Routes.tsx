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
  VIEW_MEDICINE_PATH,
  EDIT_MEDICINE_PATH,
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
import ViewMedicine from './pages/Medicines/ViewMedicine';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path={LOGIN} element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route path={DASHBOARD_PATH} element={<Dashboard />} />

      <Route path={PATIENTS} element={<Patients />} />
      <Route path={NEW_PATIENT_PATH} element={<AddEditPatient />} />
      <Route path={EDIT_PATIENT_PATH} element={<AddEditPatient />} />
      <Route path={VIEW_PATIENT_PATH} element={<ViewPatient />} />

      <Route path={PROCEDURES} element={<Procedures />} />
      <Route path={EDIT_PROCEDURE_PATH} element={<AddEditProcedure />} />
      <Route path={VIEW_PROCEDURE_PATH} element={<ViewProcedure />} />

      <Route path={USERS} element={<Users />} />
      <Route path={NEW_USER_PATH} element={<AddEditUser />} />
      <Route path={EDIT_USER_PATH} element={<AddEditUser />} />

      <Route path={MEDICINES} element={<Medicines />} />
      <Route path={NEW_MEDICINE_PATH} element={<AddEditMedicine />} />
      <Route path={EDIT_MEDICINE_PATH} element={<AddEditMedicine />} />
      <Route path={VIEW_MEDICINE_PATH} element={<ViewMedicine />} />

      <Route path={INVENTORY} element={<Inventory />} />
    </Route>
  </Routes>
);

export default AppRoutes;
