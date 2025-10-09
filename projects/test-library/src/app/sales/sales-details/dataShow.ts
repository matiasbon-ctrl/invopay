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
  dueDate: string;              // formatted as 'dd/MM/yyyy'
  amount: number;
  paid: boolean;
}
