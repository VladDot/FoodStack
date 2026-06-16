export interface PaginationProps {
  query?: string;
  locale?: string;
  pathname: string;
  totalPages: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}
