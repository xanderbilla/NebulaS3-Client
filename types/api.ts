// Base API Response Structure
export interface ApiResponse<T = unknown> {
  statusCode: number;
  message: string;
  timestamp: string;
  data?: T;
  status: "SUCCESS" | "FAILED" | "ERROR";
}

// Pagination Structure
export interface PaginationMeta {
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  appliedFilters: Record<string, string | number | boolean>;
  isFirst: boolean;
  isLast: boolean;
  totalPages: number;
  pageSize: number;
  hasPrevious: boolean;
  hasNext: boolean;
  currentPage: number;
  totalElements: number;
}

// Query Parameters
export interface PaginationParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface FilterParams {
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
