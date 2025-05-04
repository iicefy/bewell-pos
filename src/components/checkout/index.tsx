import { useCheckoutContext } from "@/context/checkout/useCheckoutContext";
import CheckoutList from "../checkout-list";
import Clock from "../clock";
import Date from "../date";
import DiscountSelect from "../discount-select";
import { Button } from "../ui/button";
import NumberInput from "../number-input";

const Checkout = () => {
  const { billDiscount, updateBillDiscount } = useCheckoutContext();

  return (
    <div className="flex flex-col gap-4 pl-2 pr-4 p-4 h-full">
      <div className="flex gap-4">
        <Date />
        <Clock />
      </div>

      <CheckoutList />

      <div className="flex bg-white w-full border rounded-xl">
        <div className="flex flex-col gap-4 p-4 w-full">
          <span className="font-bold text-xl">Checkout</span>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">ราคา</span>
            <span className="text-sm text-gray-500">฿ 1,234.56</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">รวม VAT 7%</span>
            <span className="text-sm text-gray-500">฿ 1,234.56</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">ส่วนลดท้ายบิล</span>
            <div className="flex justify-between items-center gap-2">
              <DiscountSelect
                onChange={(value) => {
                  if (!value) {
                    updateBillDiscount(() => ({
                      code: "",
                      amount: 0,
                    }));
                  } else {
                    updateBillDiscount((prev) => ({
                      code: value,
                      amount: prev.amount,
                    }));
                  }
                }}
                value={billDiscount.code}
              />
              <NumberInput
                disabled={!billDiscount.code}
                value={billDiscount.amount}
                onChange={(e) => {
                  updateBillDiscount((prev) => ({
                    code: prev.code,
                    amount: e,
                  }));
                }}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">แลกคะแนน</span>
            <span className="text-sm text-gray-500">฿ 1,234.56</span>
          </div>
          <div className="flex justify-end items-center gap-4 mt-4">
            <Button variant={"outline"}>ยกเลิก</Button>
            <Button>ชำระเงิน</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
