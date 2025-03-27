export const EXPENSE = '/api/expenses';
export const EXPENSES_ROUTE = `${EXPENSE}/list`; 
export const NEW_EXPENSE_ROUTE = `${EXPENSE}/create`;
export const getExpenseWithExpenseIdRoute = (id: string) => `${EXPENSE}/${id}`;
export const editExpenseWithExpenseIdRoute = (id: string) => `${EXPENSE}/edit/${id}`;
export const deleteExpenseWithExpenseIdRoute = (id: string) => `${EXPENSE}/delete/${id}`;

export const GET_FILTERED_EXPENSES_ROUTE = '/api/expenses/api/expenses/report/date-range';

export const GET_FILTERED_EXPENSES_BY_CATEGORY_ROUTE = (category: string) =>  `${EXPENSE}/category/${category}`;