export type PaginationType = {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
};

export type WithPagination<T> = {
  data: T;
  pagination: PaginationType;
};
