import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddProductModal from "./ProductModal";
import { useLocation, useNavigate } from "react-router-dom";
import ProductModal from "./ProductModal";

const ProductListHeader = ({ pagination }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const navigate = useNavigate();

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState({
    isOpen: false,
    type: "Add",
  });

  return (
    <div className="flex justify-between items-center py-4 px-6 animate-fade-in">
      <div className="flex items-center space-x-2">
        <span className="text-gray-500 text-sm">Home</span>
        <span className="text-gray-500 text-sm">/</span>
        <span
          className={`text-gray-800 text-sm ${
            isHomePage ? "font-medium" : ""
          } hover:cursor-pointer`}
          onClick={() => navigate("/")}
        >
          Product List
        </span>
        {!isHomePage && (
          <>
            <span className="text-gray-500 text-sm">/</span>
            <span className="text-gray-800 text-sm font-medium hover:cursor-pointer">
              Product View
            </span>
          </>
        )}
      </div>
      {isHomePage && (
        <Button
          className="bg-primary hover:bg-primary/90 transition-colors flex items-center gap-2"
          onClick={() =>
            setIsAddProductModalOpen({
              isOpen: true,
              type: "Add",
            })
          }
        >
          <PlusCircle className="h-4 w-4" />
          <span>Add Product</span>
        </Button>
      )}

      <ProductModal
        open={isAddProductModalOpen?.isOpen}
        onOpenChange={setIsAddProductModalOpen}
        pagination={pagination}
        type={isAddProductModalOpen?.type}
        // onAddProduct={onAddProduct} // Pass the add function
      />
    </div>
  );
};

export default ProductListHeader;
