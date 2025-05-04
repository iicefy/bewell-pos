import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { PencilLine } from "lucide-react";
import AmountInput from "../amount-input";
import { CartItem, DiscountType } from "@/types/checkout";
import { useCheckoutContext } from "@/context/checkout/useCheckoutContext";
import numeral from "numeral";
import { Fragment } from "react/jsx-runtime";
import DeleteModal from "../delete-modal";
import { useState } from "react";
import EditModal from "../edit-modal";
import DiscountSelect from "../discount-select";
import { Input } from "../ui/input";

type CheckoutCardProps = {
  data: CartItem;
  isSendAfter?: boolean;
};

const ProductInfo = ({ data, isSendAfter }: CheckoutCardProps) => {
  const { updateToCart } = useCheckoutContext();

  const discount: DiscountType = isSendAfter
    ? data.disCountSendAfter
    : data.disCount;

  const amount = isSendAfter ? data.amountSendAfter : data.amount;

  const max = isSendAfter
    ? data.stock - data.amount
    : data.stock - data.amountSendAfter;

  const price = isSendAfter
    ? data.price * data.amountSendAfter
    : data.price * data.amount;

  return (
    <Fragment>
      <div className="h-32 aspect-square relative">
        <img
          src={data.imageUrl}
          alt={data.productId}
          className="rounded-md object-cover w-full h-full absolute"
        />
      </div>
      <div className="flex flex-col gap-4 justify-between h-full">
        <div className="flex flex-col gap-2">
          <span className="font-bold">{data.productName}</span>
          <span className="text-sm text-gray-500">{data.productId}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-xl">
            ฿ {numeral(price).format("0,000.00")}
          </span>
          <AmountInput
            value={amount || 0}
            onAdd={() =>
              updateToCart({
                type: "increase",
                productId: data.productId,
                isSendAfter: !!isSendAfter,
              })
            }
            onDeduct={() =>
              updateToCart({
                type: "decrease",
                productId: data.productId,
                isSendAfter: !!isSendAfter,
              })
            }
            max={max}
            min={1}
          />
        </div>
        <div className="flex items-center gap-4 ">
          <div className="flex items-center gap-2 w-full">
            <span className="text-sm text-gray-500">ส่วนลด: </span>
            <DiscountSelect
              onChange={() => null}
              value={
                isSendAfter ? data.disCount.code : data.disCountSendAfter.code
              }
            />
            <Input
              placeholder="Discount"
              className="w-full"
              disabled={!discount.code}
              value={discount.amount}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const CheckoutCard = ({ data, isSendAfter }: CheckoutCardProps) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { updateToCart } = useCheckoutContext();

  return (
    <Fragment>
      <div className="flex gap-4 w-full">
        <div className="border flex w-full rounded-lg p-2 gap-4">
          <ProductInfo data={data} isSendAfter={isSendAfter} />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-[0.75rem] text-nowrap">ส่งตามหลัง</span>
          <Checkbox
            disabled
            checked={isSendAfter}
            className="rounded-sm w-full h-9"
            style={
              {
                "--primary": "var(--color-emerald-500)",
              } as React.CSSProperties
            }
          />
          {!isSendAfter && (
            <Button
              variant={"outline"}
              className="w-full"
              onClick={() => setEditModal(true)}
            >
              <PencilLine size={16} />
            </Button>
          )}
          <Button
            className="w-full"
            variant={"outline"}
            onClick={() => setDeleteModal(true)}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
      <EditModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        data={data}
        onSave={(value) => {
          updateToCart({ type: "update", product: value });
        }}
      />
      <DeleteModal
        productName={data.productName}
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onDelete={() =>
          updateToCart({
            type: "remove",
            productId: data.productId,
            isSendAfter: !!isSendAfter,
          })
        }
      />
    </Fragment>
  );
};

export default CheckoutCard;
