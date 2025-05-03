import { ProductListResponse } from "@/types/product";
import mock from "./mock.json";

const getProductService = (): Promise<ProductListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mock);
    }, 1000);
  });
};

export { getProductService };
