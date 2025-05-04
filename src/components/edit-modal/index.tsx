import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { CartItem, DiscountType } from "@/types/checkout";
import numeral from "numeral";
import DiscountSelect from "../discount-select";
import AmountInput from "../amount-input";
import NumberInput from "../number-input";

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: CartItem;
  onSave: (item: CartItem) => void;
};

const EditModal = ({ isOpen, onClose, data, onSave }: EditModalProps) => {
  const [discount, setDiscount] = useState<DiscountType>({
    amount: 0,
    code: "",
  });
  const [amount, setAmount] = useState<number>(1);

  useEffect(() => {
    if (!isOpen) {
      setDiscount({
        amount: 0,
        code: "",
      });
      setAmount(1);
    }
  }, [isOpen]);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="min-w-[700px]">
        <AlertDialogHeader>
          <AlertDialogTitle>ต้องการส่งตามหลัง</AlertDialogTitle>
          <div className="flex w-full py-2 gap-4">
            <div className="h-32 aspect-square relative">
              <img
                src={data.imageUrl}
                alt={data.productId}
                className="rounded-md object-cover w-full h-full absolute"
              />
            </div>
            <div className="flex flex-col gap-4 justify-between w-full">
              <div className="flex flex-col gap-2">
                <span className="font-bold">{data.productName}</span>
                <span className="text-sm text-gray-500">{data.productId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-xl">
                  ฿ {numeral(data.price).format("0,000.00")}
                </span>
                <AmountInput
                  value={amount || 0}
                  onAdd={() => setAmount((prev) => prev + 1)}
                  onDeduct={() => setAmount((prev) => prev - 1)}
                  max={data.amount}
                  min={1}
                />
              </div>

              <div className="flex flex-col md:items-center gap-4 md:flex-row md:justify-end flex-wrap">
                <span className="text-sm text-gray-500">ส่วนลด: </span>
                <DiscountSelect
                  onChange={(e) =>
                    setDiscount(() => ({
                      amount: 0,
                      code: e,
                    }))
                  }
                  value={discount.code}
                />
                <NumberInput
                  type={discount.code}
                  disabled={!discount.code}
                  value={discount.amount}
                  onChange={(e) => {
                    setDiscount((prev) => ({
                      amount: e,
                      code: prev.code,
                    }));
                  }}
                  max={data.price}
                />
              </div>
            </div>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>ยกเลิก</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onSave({
                ...data,
                isSendAfter: true,
                amount: data.amount - amount,
                amountSendAfter: amount,
                discountSendAfter: discount,
              });
              onClose();
            }}
          >
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditModal;
