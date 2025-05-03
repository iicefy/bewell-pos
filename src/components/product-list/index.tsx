import ProductCard from "../product-card";
import SearchInput from "../search-input";
import useSWR from "swr";
import { getProductService } from "@/services/product";
import { cn } from "@/lib/utils";

const ProductList = () => {
  const layoutStyle = cn("p-4 flex flex-col gap-4");

  const { data } = useSWR("getProductService", async () => getProductService());

  if (!data) {
    return <div className={layoutStyle}>Loading...</div>;
  }

  if (!data.productList || data.productList.length === 0) {
    return <div className={layoutStyle}>No products found</div>;
  }

  return (
    <div className={layoutStyle}>
      <SearchInput
        inputProps={{
          placeholder: "Search",
          className: "w-full bg-white",
        }}
      />
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {data?.productList?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
