import ProductCard from "../product-card";
import SearchInput from "../search-input";
import useSWR from "swr";
import { getProductService } from "@/services/product";
import { cn, useDebounce } from "@/lib/utils";
import { useState } from "react";

const layoutStyle = cn("p-4 flex flex-col gap-4");

const ProductList = () => {
  const [search, setSearch] = useState("");
  const searchDebounce = useDebounce(search, 500);
  const { data, isLoading } = useSWR(
    ["getProductService", searchDebounce],
    async () => getProductService(searchDebounce)
  );

  const renderProducts = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!data) {
      return <div>No products found</div>;
    }

    if (!data.productList || data.productList.length === 0) {
      return <div>No products found</div>;
    }

    return (
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        {data?.productList?.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </div>
    );
  };

  return (
    <div className={layoutStyle}>
      <SearchInput
        inputProps={{
          placeholder: "Search",
          className: "w-full bg-white",
          onChange: (e) => setSearch(e.target.value),
        }}
      />
      {renderProducts()}
    </div>
  );
};
export default ProductList;
