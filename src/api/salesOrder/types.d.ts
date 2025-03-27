interface SaleOrder{
    billId: number;
    billNumber?: string;
    billDate: string;
    patientName?: string;
    onlineAmount?: number;
    cashAmount?: number;
    totalAmount?: number;
    patientId: number;
  }
  type CreateSalePayload = Omit<SaleOrder, 'billId' | 'billNumber'>;


