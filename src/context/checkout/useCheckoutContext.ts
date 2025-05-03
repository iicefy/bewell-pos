import { useContext } from "react";
import { CheckoutContext } from ".";

const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutProvider"
    );
  }
  return context;
};

export { useCheckoutContext };
