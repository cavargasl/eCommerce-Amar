import { combineReducers } from "@reduxjs/toolkit";
import products from "./products";
import cart from "./cart";
import filter from "./filter";

const rootReducer = combineReducers({
  products,
  cart,
  filter,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;