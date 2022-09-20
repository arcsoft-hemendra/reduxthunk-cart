import { createSlice } from "@reduxjs/toolkit";

const Favourite = createSlice({
  name: "Favourite",
  initialState: [],
  reducers: {
    addRemoveFavourite(state, action) {
      let item = state.find((item) => item === action.payload);
      state = item
        ? state.filter((item) => item !== action.payload)
        : [...state, action.payload];
      return state;
    },
    removeFavourite(state,action){
       return state.filter((item) => item !== action.payload)
    },
  },
});

export const { addRemoveFavourite,removeFavourite } = Favourite.actions;
export default Favourite.reducer;
