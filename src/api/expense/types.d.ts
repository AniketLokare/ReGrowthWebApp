interface Expense {
    expenseId: number,
    date?: string,
    category: string,
    description?: string,
    totalAmount: number,
    cashAmount: number,
    onlineAmount: number,
  }
  
  type CreateExpensePayload = Omit<Expense, 'expenseId'>;
  