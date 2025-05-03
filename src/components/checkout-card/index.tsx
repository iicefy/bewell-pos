import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { PencilLine } from "lucide-react";
import { Product } from "@/types/product";

type CheckoutCardProps = {
  data: Product;
};

const CheckoutCard = ({ data }: CheckoutCardProps) => {
  return (
    <div className="flex gap-4 w-full bg-white">
      <div className="border flex w-full h-full rounded-lg">
        <img
          src={data.imageUrl}
          alt="Product"
          className="rounded-md object-cover mx-auto w-[60%]"
        />
        <div className="flex flex-col gap-4 justify-between h-full p-4">
          <div className="flex flex-col gap-2">
            <span className="font-bold">Product Name</span>
            <span className="text-sm text-gray-500">Product ID</span>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-bold text-xl">฿ 1,234.56</span>
              <span className="text-sm">Stock: 10</span>
            </div>
            <Button variant={"outline"}>Add to Cart</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[0.75rem] text-nowrap">ส่งภายหลัง</span>
        <Checkbox
          defaultChecked
          className="rounded-sm w-full h-9"
          style={
            {
              "--primary": "var(--color-emerald-500)",
              "--ring": "var(--color-emerald-300)",
            } as React.CSSProperties
          }
        />
        <Button variant={"outline"} className="w-full">
          <PencilLine size={16} />
        </Button>
        <Button className="w-full" variant={"outline"}>
          <Trash size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CheckoutCard;
