import { Pageable, Sort } from "../../../shared/models/pageable";

export interface PaymentMethodResponse {
  content: PaymentMethod[];
  pageable: Pageable;
  totalPages: number;
  last: boolean;
  totalElements: number;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: Sort;
  empty: boolean;
}

export interface PaymentMethod {
  id: number;
  name: string;
  logoUrl: string;
  paymentChannels: string[];
  isActive: boolean;
  description: string;
}


