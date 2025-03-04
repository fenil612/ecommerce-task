import axiosInstance from "./axiosInstance";

// fetch products
export const getProducts = async (pageNo, pageSize) => {
  try {
    const _per_page = pageSize;
    const _page = pageNo;

    const response = await axiosInstance.get("/products", {
      params: { _page, _per_page },
    });

    return {
      products: response.data || [],
      total: response.data.items || 0, // Total number of items
      pages: response.data.pages || 0, // Total number of pages
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
};
// Create a new product
export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  const response = await axiosInstance.put(`/products/${id}`, productData);
  return response.data;
};

// Delete a product
export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/products/${id}`);
  return response.data;
};