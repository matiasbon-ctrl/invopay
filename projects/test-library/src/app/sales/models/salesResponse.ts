import { Sale } from "./sale";

// Modelo principal de respuesta
export interface SalesResponse {
  content: Sale[];
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

// Modelo de paginación
export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
// Modelo de ordenamiento
export interface Sort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}