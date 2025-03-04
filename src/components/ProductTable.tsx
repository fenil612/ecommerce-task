import { useDispatch, useSelector } from "react-redux";
import { Table, Tag, Button } from "antd";
import { Edit, Trash2 } from "lucide-react";
import { deleteProduct } from "../api/productAPi";
import {
  getProducts,
  setPages,
  setSelectedProduct,
} from "@/redux/productSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";

const ProductTable = ({ data, pagination, setPagination }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state?.products);
  const selectedPagination = useSelector(
    (state) => state?.products?.pagination
  );

  const [isProductModalOpen, setIsProductModalOpen] = useState({
    isOpen: false,
    type: "Edit",
    product: {},
    pagination: pagination,
  });

  useEffect(() => {
    dispatch(setPages(pagination));
  }, [pagination?.total]);

  useEffect(() => {
    setPagination(selectedPagination);
  }, [selectedPagination?.total]);

  useEffect(() => {
    setPagination({
      current: products?.last,
      pageSize: pagination?.pageSize,
      total: products.items,
    });

    // dispatch(
    //   getProducts({
    //     pageNo: products?.last,
    //     pageSize: pagination?.pageSize,
    //   })
    // );
  }, [products?.total]);

  const updateCurrentPageOnDelete = ({ current, pageSize, total }) => {
    const totalPages = Math.ceil((total - 1) / pageSize); // New total pages after deletion
    return Math.min(current, totalPages) || 1; // Ensure page doesn't go below 1
  };

  const handleTableChange = (newPagination) => {
    setPagination((prev) => ({
      ...prev,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    }));

    dispatch(
      getProducts({
        pageNo: newPagination.current,
        pageSize: newPagination.pageSize,
      })
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);

      // Reload products after deletion

      const newCurrentPage = updateCurrentPageOnDelete(pagination);

      dispatch(
        getProducts({
          pageNo: newCurrentPage,
          pageSize: pagination.pageSize,
        })
      );
      setPagination({
        current: newCurrentPage,
        pageSize: pagination?.pageSize,
        total: products.items - 1,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleView = (record) => {
    dispatch(setSelectedProduct(record));
    navigate("/view");
  };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      width: "50px",
      // render: (text, record, index) => index + 1,
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span className="max-w-xs truncate">
          {text.length > 30 ? text.slice(0, 30) + "..." : text}
        </span>
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Discount Price",
      dataIndex: "dPrice",
      key: "dPrice",
    },
    {
      title: "Discount %",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === 1 ? "green" : "volcano"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (record) => (
        <Button
          type="link"
          className="text-primary"
          onClick={() => handleView(record)}
        >
          View
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => (
        <div className="flex space-x-2">
          <Button type="link" className="text-amber-500">
            <Edit
              className="h-4 w-4"
              onClick={() => {
                setIsProductModalOpen({
                  isOpen: true,
                  type: "Edit",
                  product: record,
                });
              }}
            />
          </Button>
          <Button
            type="link"
            className="text-red-500"
            onClick={() => handleDelete(record.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="px-6 overflow-x-auto animate-slide-up">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          // pageSize: 2,
          total: pagination.total,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "20", "50"],
        }}
        className="shadow rounded-md"
        onChange={handleTableChange}
      />
      <ProductModal
        open={isProductModalOpen?.isOpen}
        onOpenChange={setIsProductModalOpen}
        pagination={isProductModalOpen?.pagination}
        type={isProductModalOpen?.type}
        product={isProductModalOpen?.product}

        // onAddProduct={onAddProduct} // Pass the add function
      />
    </div>
  );
};

export default ProductTable;
