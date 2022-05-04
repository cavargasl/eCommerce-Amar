import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "redux/store";

const initialState = {
  data: [] as Product[]
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<Product[]>) => {
      state.data = [...state.data, ...action.payload]
    }
  }
})

export const { setProductsList } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.data

export default productsSlice.reducer;