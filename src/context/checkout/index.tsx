import { calculateDiscountedPrice } from "@/lib/utils";
import { CartItem, DiscountType, Summary } from "@/types/checkout";
import { Product } from "@/types/product";
import {
  ActionDispatch,
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useReducer,
  useState,
} from "react";

const CheckoutContext = createContext<{
  cart: CartItem[];
  updateToCart: ActionDispatch<[action: CartAction]>;
  billDiscount: DiscountType;
  updateBillDiscount: Dispatch<SetStateAction<DiscountType>>;
  summaryPrice: Summary;
}>({
  cart: [],
  updateToCart: () => {},
  billDiscount: { code: "", amount: 0 },
  updateBillDiscount: () => {},
  summaryPrice: {
    point: 0,
    priceOfVAT: 0,
    price: 0,
    summaryPrice: 0,
    amountItems: 0,
  },
});

type CheckoutContextProviderProps = {
  children: React.ReactNode;
};

type CartAction =
  | { type: "add"; product: Product }
  | {
      type: "decrease" | "increase" | "remove";
      productId: string;
      isSendAfter: boolean;
    }
  | { type: "update"; product: CartItem }
  | {
      type: "update_discount";
      productId: string;
      isSendAfter: boolean;
      discount: DiscountType;
    };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "add": {
      return [
        ...state,
        {
          ...action.product,
          isSendAfter: false,
          amount: 1,
          amountSendAfter: 0,
          discount: { code: "", amount: 0 },
          discountSendAfter: { code: "", amount: 0 },
        },
      ];
    }

    case "increase": {
      const existingProductIndex = state.findIndex(
        (item) => item.productId === action.productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];

        if (action.isSendAfter) {
          updatedCart[existingProductIndex].amountSendAfter += 1;
          updatedCart[existingProductIndex].discountSendAfter = {
            amount: 0,
            code: "",
          };
        } else {
          updatedCart[existingProductIndex].amount += 1;
          updatedCart[existingProductIndex].discount = {
            amount: 0,
            code: "",
          };
        }

        return updatedCart;
      }

      return state;
    }

    case "decrease": {
      const existingProductIndex = state.findIndex(
        (item) => item.productId === action.productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];

        if (action.isSendAfter) {
          updatedCart[existingProductIndex].amountSendAfter -= 1;
          updatedCart[existingProductIndex].discountSendAfter = {
            amount: 0,
            code: "",
          };
        } else {
          updatedCart[existingProductIndex].amount -= 1;
          updatedCart[existingProductIndex].discount = {
            amount: 0,
            code: "",
          };
        }

        return updatedCart;
      }

      return state;
    }

    case "remove": {
      const existingProductIndex = state.findIndex(
        (item) => item.productId === action.productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];

        if (action.isSendAfter) {
          updatedCart[existingProductIndex].amountSendAfter = 0;
          updatedCart[existingProductIndex].discountSendAfter = {
            amount: 0,
            code: "",
          };
          updatedCart[existingProductIndex].isSendAfter = false;
        } else {
          updatedCart[existingProductIndex].amount = 0;
          updatedCart[existingProductIndex].discount = {
            amount: 0,
            code: "",
          };
        }

        if (
          updatedCart[existingProductIndex].amount === 0 &&
          updatedCart[existingProductIndex].amountSendAfter === 0
        ) {
          return updatedCart.filter((_, i) => i !== existingProductIndex);
        }

        return updatedCart;
      }

      return state;
    }

    case "update": {
      const existingProductIndex = state.findIndex(
        (item) => item.productId === action.product.productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex] = action.product;
        return updatedCart;
      }

      return state;
    }

    case "update_discount": {
      const existingProductIndex = state.findIndex(
        (item) => item.productId === action.productId
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...state];

        if (action.isSendAfter) {
          updatedCart[existingProductIndex].discountSendAfter = action.discount;
        } else {
          updatedCart[existingProductIndex].discount = action.discount;
        }

        return updatedCart;
      }

      return state;
    }

    default:
      return state;
  }
};

const CheckoutContextProvider = ({
  children,
}: CheckoutContextProviderProps) => {
  const [billDiscount, setBillDiscount] = useState<DiscountType>({
    code: "",
    amount: 0,
  });
  const [cart, dispatch] = useReducer(cartReducer, []);

  const summaryPrice: Summary = useMemo(() => {
    const totalPrice = cart.reduce((acc, item) => {
      const itemPrice = calculateDiscountedPrice(
        item.amount,
        item.price,
        item.discount
      );
      const itemSendAfterPrice = calculateDiscountedPrice(
        item.amountSendAfter,
        item.price,
        item.discountSendAfter
      );
      return acc + itemPrice + itemSendAfterPrice;
    }, 0);

    const priceVAT = totalPrice * 0.07;
    const includedVAT = totalPrice * 1.07;

    const calculateBillDiscount = (price: number, discount: DiscountType) => {
      if (discount.code === "percent") {
        return price * (1 - discount.amount);
      }
      return price - discount.amount;
    };

    return {
      point: 0,
      price: totalPrice,
      priceOfVAT: priceVAT,
      summaryPrice: calculateBillDiscount(includedVAT, billDiscount),
      amountItems: cart.reduce(
        (acc, item) => acc + item.amount + item.amountSendAfter,
        0
      ),
    };
  }, [billDiscount, cart]);

  return (
    <CheckoutContext.Provider
      value={{
        cart,
        updateToCart: dispatch,
        billDiscount,
        updateBillDiscount: setBillDiscount,
        summaryPrice,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutContextProvider };
