import { useCheckoutContext } from "@/context/checkout/useCheckoutContext";
import CheckoutCard from "../checkout-card";
import { Fragment } from "react/jsx-runtime";

const CheckoutList = () => {
  const { cart } = useCheckoutContext();
  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-4 bg-white h-full w-full border p-4 rounded-xl overflow-y-auto top-0 right-0 left-0 bottom-0 xl:absolute">
        {cart?.map((item, i) => {
          return (
            <Fragment>
              {item.amount ? (
                <CheckoutCard data={item} key={item.productId} />
              ) : null}

              {item.amountSendAfter ? (
                <CheckoutCard data={item} key={i} isSendAfter />
              ) : null}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default CheckoutList;
