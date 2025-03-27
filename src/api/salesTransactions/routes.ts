export const SALES_TRANSACTION = 'api/medical/bill';
export const SALE_TRANSACTION_LIST = '/api/medical/bill/medicalBillsTransactions';
export const NEW_TRANSACTION_ROUTE = '/api/medical/bill/saveBillTransaction';
export const getSaleTransactionWithIdRoute = (id: string) => `${SALES_TRANSACTION}/billTransactionDetails/${id}`;
export const editSaleTransactionWithIdRoute = (id: string) => `${SALES_TRANSACTION}/updateBillTransaction/${id}`;
export const deleteSaleTransactionWithIdRoute = (id: string) => `${SALES_TRANSACTION}/deleteBillTransaction/${id}`;
export const getMedicinesListBySalesOrderIdRoute = (id: string) => `${SALES_TRANSACTION}/${id}`; 

export const GET_FILTERED_BILL_MEDICINES_ROUTE = '/api/medical/bill/transactions/reports/by-date-range'


