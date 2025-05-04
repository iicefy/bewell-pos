import { useCheckoutContext } from "@/context/checkout/useCheckoutContext";
import CheckoutList from "../checkout-list";
import Clock from "../clock";
import Date from "../date";
import DiscountSelect from "../discount-select";
import { Button } from "../ui/button";
import NumberInput from "../number-input";
import numeral from "numeral";

const Checkout = () => {
  const { billDiscount, updateBillDiscount, summaryPrice } =
    useCheckoutContext();

  return (
    <div className="flex flex-col gap-4 pl-2 pr-4 p-4 xl:h-full">
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
            <span className="text-sm text-gray-500">
              ฿ {numeral(summaryPrice.price).format("0,000.00")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">รวม VAT 7%</span>
            <span className="text-sm text-gray-500">
              ฿ {numeral(summaryPrice.priceOfVAT).format("0,000.00")}
            </span>
          </div>
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-gray-500">ส่วนลดท้ายบิล</span>
            <div className="flex items-center justify-end gap-2 flex-wrap">
              <DiscountSelect
                onChange={(value) => {
                  if (!value) {
                    updateBillDiscount(() => ({
                      code: "",
                      amount: 0,
                    }));
                  } else {
                    updateBillDiscount(() => ({
                      code: value,
                      amount: 0,
                    }));
                  }
                }}
                value={billDiscount.code}
              />
              <NumberInput
                type={billDiscount.code}
                disabled={!billDiscount.code}
                value={billDiscount.amount}
                onChange={(e) => {
                  updateBillDiscount((prev) => ({
                    code: prev.code,
                    amount: e,
                  }));
                }}
                max={summaryPrice.priceOfVAT}
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">แลกคะแนน</span>
            <span className="text-sm text-gray-500">
              ฿ {numeral(summaryPrice.point).format("0,000.00")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-xl">รวมราคาทั้งหมด</span>
            <span className="font-bold text-xl">
              ฿ {numeral(summaryPrice.summaryPrice).format("0,000.00")}
            </span>
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
