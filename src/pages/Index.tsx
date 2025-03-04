import { useEffect, useState } from "react";
import ProductTable from "@/components/ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "@/redux/productSlice";
import { Spin } from "antd";

const Index = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state?.products);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
    total: products?.items || 0, // Initially 0
  });

  useEffect(() => {
    dispatch(
      getProducts({
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (products?.data?.length) {
      setPagination(() => ({
        current: products?.first,
        pageSize: pagination?.pageSize,
        total: products.items,
      }));
    }
  }, [products?.first, products?.total]);

  return (
    <>
      <main className="flex-1 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!products ||
          Object.keys(products).length === 0 ||
          (products?.data?.length === 0 && loading) ? (
            <Spin size="large" />
          ) : (
            <ProductTable
              data={products?.data || []}
              pagination={pagination}
              setPagination={setPagination}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default Index;
