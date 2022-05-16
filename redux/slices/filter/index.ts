import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "redux/store"

const initialState = {
  word: ""
}

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searching: (state, action) => {
      state.word = action.payload
    }
  }
})

export const { searching } = filterSlice.actions
export const selectFilter = (state: RootState) => state.filter

export default filterSlice.reducer;