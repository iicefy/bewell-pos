import { Product } from "@/types/product";
import { Badge } from "../ui/badge";
import numeral from "numeral";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useCheckoutContext } from "@/context/checkout/useCheckoutContext";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { cart, updateToCart } = useCheckoutContext();

  const existingProduct = cart?.find(
    (item) => item.productId === product.productId
  );

  return (
    <div className="w-full h-full bg-white border rounded-lg p-4 flex flex-col gap-4">
      <img
        src={product.imageUrl}
        alt={product.productId}
        className="rounded-md object-cover mx-auto h-full aspect-square"
        loading="lazy"
      />
      <div className="flex flex-col gap-4 justify-between h-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold">{product.productName}</span>

          <span className="text-[0.75rem] text-gray-500">
            {product.productId}
          </span>
        </div>

        <Badge className="mb" variant={"secondary"}>
          {capitalizeFirstLetter(product.category)}
        </Badge>

        <div className="flex items-end justify-between flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-xl text-nowrap">
              ฿ {numeral(product.price).format("0,000.00")}
            </span>
            <span className="text-sm">Stock: {product.stock}</span>
          </div>

          {product.stock === 0 ? (
            <span className="text-sm text-red-500">Out of stock</span>
          ) : !existingProduct ? (
            <Button onClick={() => updateToCart({ type: "add", product })}>
              <ShoppingCart size={16} aria-hidden="true" />
            </Button>
          ) : (
            <span className="text-sm text-gray-500">
              {(existingProduct?.amount || 0) +
                (existingProduct?.amountSendAfter || 0)}{" "}
              in cart
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
