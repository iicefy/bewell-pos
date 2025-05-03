import { PaginationType } from "@/types/utils";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";

type ProductPaginationProps = {
  pagination: Pick<PaginationType, "currentPage" | "totalPages">;
  onPageChange: (page: number) => void;
};

const ProductPagination = ({
  pagination,
  onPageChange,
}: ProductPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="text-muted-foreground grow text-sm" aria-live="polite">
        Page <span className="text-foreground">{pagination.currentPage}</span>{" "}
        of <span className="text-foreground">{pagination.totalPages}</span>
      </p>
      <Pagination className="w-auto">
        <PaginationContent className="gap-3">
          <PaginationItem>
            <Button
              onClick={() => {
                if (onPageChange) {
                  onPageChange(pagination.currentPage - 1);
                }
              }}
              variant="outline"
              className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={pagination.currentPage === 1 ? true : undefined}
              role={pagination.currentPage === 1 ? "link" : undefined}
              asChild
            >
              <span>Previous</span>
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button
              onClick={() => {
                if (onPageChange) {
                  onPageChange(pagination.currentPage + 1);
                }
              }}
              variant="outline"
              className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50"
              aria-disabled={
                pagination.currentPage === pagination.totalPages
                  ? true
                  : undefined
              }
              role={
                pagination.currentPage === pagination.totalPages
                  ? "link"
                  : undefined
              }
              asChild
            >
              <span>Next</span>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductPagination;
