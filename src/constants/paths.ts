export const DASHBOARD_PATH = '/';

export const LOGIN = '/login';

export const PATIENTS = '/patients';
export const NEW_PATIENT_PATH = '/patients/new';
export const EDIT_PATIENT_PATH = '/patients/:id/edit';
export const VIEW_PATIENT_PATH = '/patients/:id';
export const getEditPatientRoute = (id: string) => `${PATIENTS}/${id}/edit`;
export const getViewPatientPath = (id: string) => `${PATIENTS}/${id}`;

export const PROCEDURES = '/procedures';
export const EDIT_PROCEDURE_PATH = '/procedures/:id/edit';
export const VIEW_PROCEDURE_PATH = '/procedures/:id';
export const getEditProcedureRoute = (id: string) => `${PROCEDURES}/${id}/edit`;
export const getViewProcedurePath = (id: string) => `${PROCEDURES}/${id}`;

export const USERS = '/users';
export const NEW_USER_PATH = '/users/new';
export const EDIT_USER_PATH = '/users/:id/edit';
export const getEditUserRoute = (id: string) => `${USERS}/${id}/edit`;

export const MEDICINES = '/medicines';
export const NEW_MEDICINE_PATH = '/medicines/new';
export const EDIT_MEDICINE_PATH = '/medicines/:id/edit';
export const VIEW_MEDICINE_PATH = '/medicines/:id';
export const getEditMedicineRoute = (id: string) => `${MEDICINES}/${id}/edit`;
export const getViewMedicinePath = (id: string) => `${MEDICINES}/${id}`;

export const INVENTORY = '/inventory';

