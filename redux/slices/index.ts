import { combineReducers } from "@reduxjs/toolkit";
import products from "./products";
import cart from "./cart";

const rootReducer = combineReducers({
  products,
  cart,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;