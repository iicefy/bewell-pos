import { ProductListResponse } from "@/types/product";
import mock from "./mock.json";

const getProductService = (search: string): Promise<ProductListResponse> => {
  return new Promise((resolve) => {
    const mockData = mock as ProductListResponse;
    const filteredProducts = mockData.productList.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
    setTimeout(() => {
      resolve({
        ...mockData,
        productList: filteredProducts,
      });
    }, 1000);
  });
};

export { getProductService };
