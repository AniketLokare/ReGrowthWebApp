import React from 'react';
import { FaCartPlus, FaProcedures, FaTruck } from 'react-icons/fa';
import { FcBriefcase, FcBullish, FcCalendar, FcConferenceCall, FcFilingCabinet, FcPortraitMode,FcViewDetails ,FcPrint,FcSalesPerformance   } from 'react-icons/fc';
import { MdBarChart, MdNoteAdd, MdPersonAddAlt1, MdViewComfy, MdViewList,MdHail,MdHotel   } from 'react-icons/md';
import { GiMedicinePills } from "react-icons/gi";
import { FaUsersViewfinder } from "react-icons/fa6"
import { FaFileMedicalAlt } from "react-icons/fa";
import { AiFillMedicineBox } from "react-icons/ai";

import {
  APPOINTMENTS,
  DASHBOARD_PATH,
  EXTERNAL_PROCEDURE,
  MEDICINES,
  NEW_APPOINTMENT_PATH,
  NEW_EXTERNAL_PROCEDURE_PATH,
  NEW_PATIENT_PATH,
  NEW_USER_PATH,
  PATIENTS,
  PROCEDURES,
  PURCHASE_ORDERS,
  APPOINTMENT_BYDATE_PATH,
  SALES_ORDERS,
  SUPPLIERS,
  USERS,
  CLINIC_PROCEDURE_REPORT,
  EXTERNAL_PROCEDURE_REPORT,
  MEDICAL_BILL_REPORT,
  MEDICAL_BILL_MEDICINES_REPORT,
  EXPENSE,
  NEW_EXPENSE_PATH,
  VIEW_EXPENSE_PATH,
} from 'src/constants/paths';
import { RiCalendarView, RiHeartAdd2Fill,RiCalendarCheckLine  } from 'react-icons/ri';
import { HiUserAdd } from 'react-icons/hi';

export const globalOptions = [
  {
    title: 'DASHBOARD',
    icon: <FcBullish size="24px" />,
    route: DASHBOARD_PATH, 
    tooltip: 'Dashboard', 
  },
  {
    title: 'APPOINTMENTS',
    icon: <FcCalendar size="24px" />,
    options: [
      {
        title: 'Add New Appointment',
        icon: <RiHeartAdd2Fill size="18px" />,
        route: NEW_APPOINTMENT_PATH,
        isSubItem: true,
        tooltip: 'Add New Appointment', 
      },
      {
        title: 'View Appointments',
        icon: <RiCalendarCheckLine  size="18px" />,
        route: APPOINTMENTS,
        isSubItem: true,
        tooltip: 'View Appointments', 
      },

      {
        title: 'View By Date',
        icon: <RiCalendarView size="18px" />,
        route: APPOINTMENT_BYDATE_PATH,
        isSubItem: true,
        tooltip: 'View Appointments', 
      }
    ],
    tooltip: 'Appointments', 
  },
  {
    title: 'PATIENTS',
    icon: <FcConferenceCall size="24px" />,
    options: [
      {
        title: 'Add New Patient',
        icon: <MdPersonAddAlt1 size="18px" />,
        route: NEW_PATIENT_PATH,
        isSubItem: true,
        tooltip: 'Add New Patient', 
      },
      {
        title: 'View Patients',
        icon: <MdViewList size="18px" />,
        route: PATIENTS,
        isSubItem: true,
        tooltip: 'View Patients', 
      },
      {
        title: 'View Procedures',
        icon: <FaProcedures size="18px" />,
        route: PROCEDURES,
        isSubItem: true,
        tooltip: 'View Procedures', 
      },
    ],
    tooltip: 'Patients', 
  },
  {
    title: 'INVENTORY',
    icon: <FcFilingCabinet size="24px" />,
    options: [
      {
        title: 'Medicines',
        icon: <GiMedicinePills size="18px" />,
        route: MEDICINES,
        tooltip: 'Medicines', 
      },
      {
        title: 'Invoices',
        icon: <FaCartPlus size="18px" />,
        route: PURCHASE_ORDERS,
        tooltip: 'Purchase Orders', 
      },
      {
        title: 'Billings',
        icon: <MdBarChart size="18px" />,
        route: SALES_ORDERS,
        tooltip: 'Sales Orders', 
      },
      
    ],
    tooltip: 'Inventory', 
  },
  {
    title: 'EXT PROCEDURES',
    icon: <FcBriefcase size="24px" />,
    options: [
      {
        title: 'Add New Procedure',
        icon: <MdNoteAdd size="18px" />,
        route: NEW_EXTERNAL_PROCEDURE_PATH,
        isSubItem: true,
        tooltip: 'Add New Procedure', 
      },
      {
        title: 'View Procedures',
        icon: <MdViewComfy size="18px" />,
        route: EXTERNAL_PROCEDURE,
        isSubItem: true,
        tooltip: 'View Procedures', 
      }
    ],
    tooltip: 'External Procedures', 
  },
  {
    title: 'EXPENSES',
    icon: <FcSalesPerformance  size="24px" />,
    options: [
      {
        title: 'Add Expense',
        icon: <MdNoteAdd size="18px" />,
        route: NEW_EXPENSE_PATH,
        isSubItem: true,
        tooltip: 'Add New Expense', 
      },
      {
        title: 'View Expenses',
        icon: <MdViewComfy size="18px" />,
        route: EXPENSE,
        isSubItem: true,
        tooltip: 'View Expenses', 
      }
    ],
    tooltip: 'External Procedures', 
  },
  {
    title: 'REPORTS',
    icon: <FcPrint  size="24px" />,
    options: [
      {
        title: 'Clinic Procedures',
        icon: <MdHotel  size="18px" />,
        route: CLINIC_PROCEDURE_REPORT,
        isSubItem: true,
        tooltip: 'Add New User', 
      },
      {
        title: 'External Procedures',
        icon: <MdHail  size="18px" />,
        route: EXTERNAL_PROCEDURE_REPORT,
        isSubItem: true,
        tooltip: 'Vies Users', 
      },
      {
        title: 'Medical Bills',
        icon: <FaFileMedicalAlt size="18px" />,
        route: MEDICAL_BILL_REPORT,
        isSubItem: true,
        tooltip: 'Vies Users', 
      },

      {
        title: 'Bill Medicines',
        icon: <AiFillMedicineBox size="18px" />,
        route: MEDICAL_BILL_MEDICINES_REPORT,
        isSubItem: true,
        tooltip: 'Vies Users', 
      },
    ],
    tooltip: 'Reports', 
  },
  {
    title: 'USERS',
    icon: <FcPortraitMode size="24px" />,
    options: [
      {
        title: 'Add New User',
        icon: <HiUserAdd size="18px" />,
        route: NEW_USER_PATH,
        isSubItem: true,
        tooltip: 'Add New User', 
      },
      {
        title: 'View Users',
        icon: <FaUsersViewfinder size="18px" />,
        route: USERS,
        isSubItem: true,
        tooltip: 'Vies Users', 
      },
    ],
    tooltip: 'Users', 
  },
];