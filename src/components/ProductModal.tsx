import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProduct, updateProduct } from "@/api/productAPi";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, setPages } from "@/redux/productSlice";

const ProductModal = ({ open, onOpenChange, type, product }) => {
  const dispatch = useDispatch();
  const selectedPagination = useSelector(
    (state) => state?.products?.pagination
  );

  const categories = ["Silver", "Ring", "Gold"];

  const initialValues = {
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    dPrice: product?.dPrice || "",
    discountPercentage: product?.discountPercentage || "",
    category: product?.category || "Silver",
    images: null,
    status: product?.status ?? 1,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number().required("Price is required").positive().integer(),
    dPrice: Yup.number()
      .required("Discount price is required")
      .positive()
      .integer()
      .lessThan(
        Yup.ref("price"),
        "Discount price must be less than the regular price"
      ),
    discountPercentage: Yup.number()
      .required("Discount % is required")
      .positive()
      .integer(),
    // images: Yup.mixed().required("At least one image is required"),
  });
  const updateCurrentPageOnAdd = ({ current, pageSize, total }) => {
    const totalPages = Math.ceil((total + 1) / pageSize); // New total pages after addition
    return Math.max(current, totalPages); // Ensure the current page updates if a new page is created
  };
  const handleAddProduct = async (values: typeof initialValues) => {
    try {
      const productData = { ...values };
      const newProduct = await createProduct(productData);
    
      // newProduct;
      onOpenChange(false);

      const newCurrentPage = updateCurrentPageOnAdd(selectedPagination);
     

      dispatch(
        getProducts({
          pageNo: newCurrentPage,
          pageSize: selectedPagination?.pageSize,
        })
      );
      dispatch(
        setPages({
          current: newCurrentPage,
          pageSize: selectedPagination?.pageSize,
          total: selectedPagination?.total + 1,
        })
      );
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (values: typeof initialValues) => {
    try {
      const productData = { ...values };
     
      const updatedProduct = await updateProduct(product?.id, productData);
    
      // newProduct;
      onOpenChange(false);
      dispatch(
        getProducts({
          pageNo: selectedPagination?.current,
          pageSize: selectedPagination?.pageSize,
        })
      );
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      setFieldValue("images", files[0]); // Store the first image file
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white p-6 rounded-lg max-h-[90vh] overflow-auto">
        <DialogHeader className="flex items-center mb-4">
          <DialogTitle className="text-xl font-semibold">
            {type} Product
          </DialogTitle>
        </DialogHeader>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={type == "Add" ? handleAddProduct : handleEditProduct}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="grid gap-5">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className="text-sm font-medium block mb-1.5"
                    >
                      Name
                    </label>
                    <Field
                      id="name"
                      name="name"
                      as={Input}
                      placeholder="Enter Name"
                      className="w-full border border-gray-200 rounded"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div className="flex-1">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium block mb-1.5"
                    >
                      Category
                    </label>
                    <Field
                      as="select"
                      id="category"
                      name="category"
                      className="w-full border border-gray-200 rounded py-2"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="text-sm font-medium block mb-1.5"
                  >
                    Description
                  </label>
                  <Field
                    id="description"
                    name="description"
                    as="textarea"
                    placeholder=""
                    className="w-full min-h-20 rounded border border-gray-200 px-3 py-2 text-sm"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div>
                  <label
                    htmlFor="images"
                    className="text-sm font-medium block mb-1.5"
                  >
                    Images
                  </label>
                  <input
                    id="images"
                    name="images"
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleImageChange(event, setFieldValue)
                    }
                    className="border border-gray-200 rounded w-full p-2"
                  />
                  <ErrorMessage
                    name="images"
                    component="div"
                    className="text-red-500 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="price"
                      className="text-sm font-medium block mb-1.5"
                    >
                      Price
                    </label>
                    <Field
                      id="price"
                      name="price"
                      as={Input}
                      placeholder="Price"
                      className="border border-gray-200"
                    />
                    <ErrorMessage
                      name="price"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dPrice"
                      className="text-sm font-medium block mb-1.5"
                    >
                      Discount Price
                    </label>
                    <Field
                      id="dPrice"
                      name="dPrice"
                      as={Input}
                      placeholder="Discount Price"
                      className="border border-gray-200"
                    />
                    <ErrorMessage
                      name="dPrice"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="discountPercentage"
                      className="text-sm font-medium block mb-1.5"
                    >
                      Discount %
                    </label>
                    <Field
                      id="discountPercentage"
                      name="discountPercentage"
                      as={Input}
                      placeholder="Discount %"
                      className="border border-gray-200"
                    />
                    <ErrorMessage
                      name="discountPercentage"
                      component="div"
                      className="text-red-500 text-xs"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8 gap-2">
                  <Button
                    type="submit"
                    className="bg-teal-700 hover:bg-teal-800 text-white px-6"
                  >
                    {type}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    className="text-gray-500 border-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
