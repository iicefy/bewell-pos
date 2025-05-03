import "./App.css";
import Checkout from "./components/checkout";
import Header from "./components/header";
import ProductList from "./components/product-list";

function App() {
  return (
    <div className="bg-accent h-screen relative">
      <Header />
      <div className=" w-full grid grid-cols-[1fr_600px] h-full pt-16">
        <div className=" h-full w-full overflow-y-auto">
          <ProductList />
        </div>
        <div className="h-full bg-white">
          <Checkout />
        </div>
      </div>
    </div>
  );
}

export default App;
