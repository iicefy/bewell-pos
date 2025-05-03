import ProductCard from "../product-card";
import SearchInput from "../search-input";

const ProductList = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <SearchInput
        inputProps={{
          placeholder: "Search",
          className: "w-full bg-white",
        }}
      />
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </div>
    </div>
  );
};

export default ProductList;
