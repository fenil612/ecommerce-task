import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice"; // Adjust the path

const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default store;
