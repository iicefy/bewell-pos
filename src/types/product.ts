export interface ProductListResponse {
  success: boolean;
  totalProduct: number;
  productList: Product[];
}

export interface Product {
  no: number;
  productId: string;
  productName: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
}
