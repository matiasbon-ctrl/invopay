export interface saleDetail {
  id: number;
  amount: number;
  saleDate: string;
  currency: string;
  customer: Customer;
  brokerId: number;
  brokerName: string;
  brokerNameBussiness: string;
  productId: string;
  productName: string;
  premiumPaymentInstallments: number;
  policyData: PolicyData;
}

export interface Customer {
  externalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  fullName: string;
}

export interface PolicyData {
  number: string;
  amount: number;
  saleDate: string | null;
  productName: string | null;
  premiumAmount: number;
  premiumPaymentInstallments: number | null;
  premiumPaymentPlan: PremiumPaymentPlan[];
}

export interface PremiumPaymentPlan {
  installmentNumber: number;
  dueDate: string;
  amount: number;
  isPaid: boolean;
}
