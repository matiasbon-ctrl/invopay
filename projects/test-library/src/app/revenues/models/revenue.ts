export interface Revenue {
  id: number;
  revenueDate: string; // fecha en ISO, podés convertir a Date si querés
  currency: string;
  revenueAmount: number;
  paymentProvider: string;
  paymentChannel: string;
  isConsolidated: boolean;
  policyNumber: string;
  productName: string;
  premiumAmount: number;
  brokerName: string;
}