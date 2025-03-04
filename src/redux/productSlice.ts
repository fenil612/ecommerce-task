import axiosInstance from "@/api/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async ({ pageNo, pageSize }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products", {
        params: { _page: pageNo, _per_page: pageSize },
      });

      return {
        products: response.data || [],
        total: response.data.items || 0, // Total number of items
        pages: response.data.pages || 0, // Total number of pages
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// Create a product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/products", productData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create product");
    }
  }
);


// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      console.log('deletinggg slice=>', response.data)
      return response.data;
      // return id; // Return deleted product ID to update state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete product");
    }
  }
);


// Slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    total: 0,
    pages: 0,
    loading: false,
    error: null,
    selectedProduct: null,
    pagination: null,
  },
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    setPages: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch products
      .addCase(getProducts.pending, (state) => {
        // console.log('pending')
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        // console.log('fullfill',  action.payload)
        state.loading = false;
        state.products = action.payload.products;
        state.total = action.payload.total;
        state.pages = action.payload.pages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })

      // Delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      });
  },
});

export const { setSelectedProduct, clearSelectedProduct, setPages } = productSlice.actions;
export default productSlice.reducer;
