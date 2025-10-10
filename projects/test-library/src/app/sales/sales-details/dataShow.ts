export interface DataShow {
  id: number;
  saleDate: string;             // formatted as 'dd/MM/yyyy'
  productName: string;
  policyNumber: string;
  policyValue: string;
  premiumValue: string;
  brokerCommissionPercent: string;
  brokerCommissionARS: string;
  brokerBusiness: string;
  brokerName: string;
  premiumInstallments: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  installmentPlan: Installment[];
}

export interface Installment {
  number: number;
  dueDate: string;              // 'dd/MM/yyyy'
  amount: string;
  paid: string;                // indica si la cuota fue pagada
  state?: string;               // "Pagada" | "Pendiente"
  brokerCommissionPaid?: string; // si la comisión del broker fue pagada
  commissionValue?: string;     // valor de la comisión (ARS)
  paymentDate?: string | null;  // fecha de pago de la cuota o comisión
}
