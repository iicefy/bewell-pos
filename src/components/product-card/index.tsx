import { Product } from "@/types/product";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-full h-full bg-white border rounded-lg p-4">
      <div>{product.productName}</div>
    </div>
  );
};

export default ProductCard;
