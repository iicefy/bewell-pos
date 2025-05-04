import Checkout from "@/components/checkout";
import Header from "@/components/header";
import ProductList from "@/components/product-list";
import { CheckoutContextProvider } from "@/context/checkout";

const Home = () => {
  return (
    <CheckoutContextProvider>
      <div className="bg-accent h-screen relative">
        <Header />
        <div className="w-full grid grid-cols-1 xl:grid-cols-[1fr_700px] h-full pt-16">
          <div className=" h-full w-full xl:overflow-y-auto">
            <ProductList />
          </div>
          <div className="h-full">
            <Checkout />
          </div>
        </div>
      </div>
    </CheckoutContextProvider>
  );
};

export default Home;
