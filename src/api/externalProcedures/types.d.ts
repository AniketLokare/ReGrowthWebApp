interface ExternalProcedure {
  doctorId: number,
  doctorName: string,
  procedureDate?: string,
  procedureType: string,
  procedureDetail: string,
  feesCharged: number,
  discount?: number,
  finalAmount: number,
  cashierName?: string,
  timestamp?: Date
  cashPayment: number,
  onlinePayment: number,
}

type CreateExternalProcedurePayload = Omit<ExternalProcedure, 'doctorId' | 'timestamp'>;
