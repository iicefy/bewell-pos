import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import numeral from "numeral";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-full h-full bg-white border rounded-lg p-4 flex flex-col gap-4">
      <img
        src={product.imageUrl}
        alt={product.productId}
        className="rounded-md"
      />
      <div className="flex flex-col gap-4 justify-between h-full">
        <div className="flex flex-col gap-4">
          <span className="font-bold">{product.productName}</span>
          <span className="text-gray-500">{product.productId}</span>
          <Badge variant={"secondary"}>{product.category}</Badge>
        </div>
        <div className="flex justify-start w-full text-xl">
          <span>฿ {numeral(product.price).format("0.00")}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
