import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const conditionType = Object.freeze({
  loading: "LOADING",
  success: "SUCCESS",
  error: "ERROR",
});

const Product = createSlice({
  name: "product",
  initialState: {
    products: [],
    condition: conditionType.loading,
    singleItem: {},
  },
  reducers: {
    singleItem(state, action) {
      let item = state.products.find((item) => item.id === Number(action.payload));
      state.singleItem = item ? item : {};
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.pending, (state, action) => {
      state.condition = conditionType.loading;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.condition = conditionType.success;
      // let productData = JSON?.stringify(state.products);
      // productData =
      //   productData === JSON?.stringify(action.payload)
      //     ? state.products
      //     : 
      state.products.push(...action.payload);
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.condition = conditionType.error;
    });
  },
});

// export const getProducts = createAsyncThunk("products/list", async () => {
//   const response = await fetch("https://fakestoreapi.com/products");
//   const data = await response.json()
//   return data
// });

export const getProducts = createAsyncThunk("products/list", async (data) => {
  // const response = await fetch("https://fakestoreapi.com/products");
  // const data = await response.json()
  return data;
});

export const { singleItem } = Product.actions;

export default Product.reducer;
