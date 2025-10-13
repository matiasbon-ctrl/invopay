import { Pageable, Sort } from "../../shared/models/pageable";
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
