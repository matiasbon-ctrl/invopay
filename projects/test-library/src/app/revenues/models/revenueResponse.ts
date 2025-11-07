import { Pageable, Sort } from "../../shared/models/pageable";
import { PendingRevenue } from "./pendingRevenue";
import { Revenue } from "./revenue";

export interface RevenuesResponse {
  content: Revenue[];
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
export interface PendingRevenuesResponse {
  content: PendingRevenue[];
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
