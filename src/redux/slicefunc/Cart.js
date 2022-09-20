import { createSlice } from "@reduxjs/toolkit";

const Cart = createSlice({
  name: "Cart",
  initialState: [],
  reducers: {
    add(state, action) {
      state.push({ ...action.payload, quantity: 1 });
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increment(state, action) {
      let item = state.find((item) => item.id === action.payload);
      item.quantity = item.quantity + 1;
      return state;
    },
    decrement(state, action) {
      let item = state.find((item) => item.id === action.payload);
      item.quantity = item.quantity > 1 ? item.quantity - 1 : item.quantity;
      return state;
    },
  },
});

export const { add, remove, increment, decrement } = Cart.actions;
export default Cart.reducer;
