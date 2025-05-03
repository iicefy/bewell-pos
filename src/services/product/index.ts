import { ProductListResponse } from "@/types/product";
import mock from "./mock.json";
import { PaginationType, WithPagination } from "@/types/utils";

const getProductService = (
  search: string,
  pagination: Pick<PaginationType, "currentPage" | "limit">
): Promise<WithPagination<ProductListResponse>> => {
  const mockData = mock as ProductListResponse;

  const filteredProducts = mockData.productList.filter((product) =>
    product.productName.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(filteredProducts.length / pagination.limit);
  const startIndex = (pagination.currentPage - 1) * pagination.limit;
  const endIndex = startIndex + pagination.limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          ...mockData,
          productList: paginatedProducts,
        },
        pagination: {
          ...pagination,
          totalPages: totalPages,
          currentPage: pagination.currentPage,
          totalItems: totalItems,
        },
      });
    }, 1000);
  });
};

export { getProductService };
