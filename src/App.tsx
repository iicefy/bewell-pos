import "./App.css";
import Checkout from "./components/checkout";
import Header from "./components/header";
import ProductList from "./components/product-list";
import { createBrowserRouter, RouterProvider } from "react-router";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div className="bg-accent h-screen relative">
          <Header />
          <div className=" w-full grid grid-cols-[1fr_500px] h-full pt-16">
            <div className=" h-full w-full overflow-y-auto">
              <ProductList />
            </div>
            <div className="h-full bg-white">
              <Checkout />
            </div>
          </div>
        </div>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
