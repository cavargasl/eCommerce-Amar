import { combineReducers } from "@reduxjs/toolkit";
import products from "./products";

const rootReducer = combineReducers({
  products
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;