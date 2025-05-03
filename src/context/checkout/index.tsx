import { CartItem } from "@/types/checkout";
import { Product } from "@/types/product";
import { createContext, useState } from "react";

const CheckoutContext = createContext<{
  cart: CartItem[];
  updateToCart: (product: Product, type: "add" | "deduct") => void;
  removeFromCart: (productId: string) => void;
}>({
  cart: [],
  updateToCart: () => {},
  removeFromCart: () => {},
});

type CheckoutContextProviderProps = {
  children: React.ReactNode;
};

const CheckoutContextProvider = ({
  children,
}: CheckoutContextProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  function updateToCart(product: Product, type: "add" | "deduct") {
    console.log("updateToCart", product, type);

    const existingProductIndex = cart.findIndex(
      (item) => item.productId === product.productId
    );

    if (type === "add") {
      if (existingProductIndex !== -1) {
        console.log("existingProductIndex", existingProductIndex);
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].amount += 1;
        setCart(updatedCart);
      } else {
        setCart((prev) => [...prev, { ...product, amount: 1 }]);
      }
    }

    if (type === "deduct") {
      if (existingProductIndex !== -1) {
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].amount -= 1;

        if (updatedCart[existingProductIndex].amount <= 0) {
          updatedCart.splice(existingProductIndex, 1);
        }

        setCart(updatedCart);
      }
    }
  }

  function removeFromCart(productId: string) {
    const updatedCart = cart.filter((item) => item.productId !== productId);
    setCart(updatedCart);
  }

  return (
    <CheckoutContext.Provider value={{ cart, updateToCart, removeFromCart }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext, CheckoutContextProvider };
