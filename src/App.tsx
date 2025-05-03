import "./App.css";
import Checkout from "./components/checkout";
import Header from "./components/header";
import ProductList from "./components/product-list";

function App() {
  return (
    <div className="bg-slate-200 h-screen relative">
      <Header />
      <div className=" bg-white w-full grid grid-cols-[1fr_600px] h-full pt-16">
        <div className=" bg-slate-200 h-full">
          <ProductList />
        </div>
        <div className="h-full">
          <Checkout />
        </div>
      </div>
    </div>
  );
}

export default App;
