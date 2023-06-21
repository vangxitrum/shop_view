import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import authReducer from './reducers/authSlice'
import cartReducer from './reducers/cartSlice'
import appSlice from './reducers/appSlice'
import productSlide from './reducers/productSlide'
import userSlice from './reducers/userSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'

const cartPersistConfig = {
  key: 'cart',
  storage: storage,
  blacklist: ['cartMessages', 'addLoading', 'deleteLoading', 'checkoutData']
}

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

const rootReducer = combineReducers({
  app: appSlice,
  auth: authReducer,
  user: userSlice,
  cart: persistReducer(cartPersistConfig, cartReducer),
  product: productSlide
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
