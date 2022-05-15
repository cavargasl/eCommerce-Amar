import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "redux/store"

const initialState = {
  items: [] as CartItem[],
  amountAll: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const isInCart = state.items.some(item => item.id === action.payload.id)

      if (!isInCart) {
        state.items = state.items.concat({ ...action.payload, quantity: 1 })
        state.amountAll += 1
      } else {
        const newData = state.items.reduce((acc: Array<CartItem>, _product: CartItem) => {
          if (action.payload.id === _product.id) {
            return acc.concat({ ..._product, quantity: _product.quantity + 1 });
          }
          return acc.concat(_product)
        }, [])
        state.items = newData
        state.amountAll += 1
      }
    },
    decrementToCart: (state, action: PayloadAction<CartItem>) => {
      if (action.payload.quantity > 1) {
        const newData = state.items.reduce((acc: Array<CartItem>, _product: CartItem) => {
          if (action.payload.id === _product.id) {
            return acc.concat({ ..._product, quantity: _product.quantity - 1 });
          }
          return acc.concat(_product)
        }, [])
        state.items = newData
        state.amountAll -= 1
      }
    },
    removeToCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(_product => _product.id != action.payload.id)
      state.amountAll = state.amountAll - action.payload.quantity
    }
  }
})

export const { addToCart, decrementToCart, removeToCart } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer;