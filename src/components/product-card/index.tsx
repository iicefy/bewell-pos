import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import numeral from "numeral";
import { useState } from "react";
import AmountInput from "../amount-input";
import { capitalizeFirstLetter } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [amount, setAmount] = useState(0);
  return (
    <div className="w-full h-full bg-white border rounded-lg p-4 flex flex-col gap-4">
      <img
        src={product.imageUrl}
        alt={product.productId}
        className="rounded-md object-cover mx-auto w-[60%]"
      />
      <div className="flex flex-col gap-4 justify-between h-full">
        <Badge className="mb" variant={"secondary"}>
          {capitalizeFirstLetter(product.category)}
        </Badge>
        <div className="flex flex-col gap-2">
          <span className="font-bold">{product.productName}</span>

          <span className="text-sm text-gray-500">{product.productId}</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xl">
              ฿ {numeral(product.price).format("0,000.00")}
            </span>
            <span className="text-sm">Stock: {product.stock}</span>
          </div>

          {product.stock === 0 ? (
            <span className="text-sm text-red-500">Out of stock</span>
          ) : (
            <AmountInput
              value={amount}
              onChange={(amount) => setAmount(amount)}
              max={product.stock}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
