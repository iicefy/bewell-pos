import ProductCard from "../product-card";
import SearchInput from "../search-input";
import useSWR from "swr";
import { getProductService } from "@/services/product";
import { cn, useDebounce } from "@/lib/utils";
import { Fragment, useState } from "react";
import ProductPagination from "../product-pagination";
import { useSearchParams } from "react-router";
import { useNavigate } from "react-router";

const layoutStyle = cn("p-4 flex flex-col gap-4");
const ProductList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const pageQuery: number = parseInt(searchParams.get("page") || "1", 10);
  const searchQuery: string = searchParams.get("search") || "";
  const [search, setSearch] = useState(searchQuery);

  const pagination = {
    currentPage: pageQuery || 1,
    limit: 6,
  };

  const searchDebounce = useDebounce(search, 500, () => {
    navigate({
      search: `?page=1&search=${search}`,
    });
  });

  const { data, isLoading } = useSWR(
    ["getProductService", searchDebounce, pagination],
    async () => getProductService(searchDebounce, pagination)
  );

  const renderProducts = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!data?.data) {
      return <div>No products found</div>;
    }

    if (!data?.data?.productList || data?.data?.productList.length === 0) {
      return <div>No products found</div>;
    }

    return (
      <Fragment>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {data?.data?.productList?.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
        <ProductPagination
          pagination={{
            currentPage: pagination.currentPage,
            totalPages: data?.pagination.totalPages,
          }}
          onPageChange={(page) => {
            navigate({
              search: searchQuery
                ? `?page=${page}&search=${searchQuery}`
                : `?page=${page}`,
            });
          }}
        />
      </Fragment>
    );
  };

  return (
    <div className={layoutStyle}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Product List</h1>
        <span className="text-gray-500">
          {data?.pagination?.totalItems || 0} items
        </span>
      </div>
      <SearchInput
        inputProps={{
          value: search,
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
