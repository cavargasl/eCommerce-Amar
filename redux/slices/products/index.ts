import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { RootState } from "redux/store";

const initialState = {
  data: [] as Product[]
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsList: (state, action: PayloadAction<Product[]>) => {
      state.data = action.payload
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      if (action?.payload) {
        state.data = action.payload.products.data
      }
    }
  }
})

export const { setProductsList } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.data

export default productsSlice.reducer;