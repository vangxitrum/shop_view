import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ProductState } from '../../interfaces'

const initialState: ProductState = {}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setQuickViewProduct: (state, action) => {
      state.quickViewProductId = action.payload
    }
  }
})

export const productState = (state: RootState) => state.product
export const { setQuickViewProduct } = productSlice.actions

export default productSlice.reducer
