import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { AuthUser } from '../../interfaces'
import { AuthServices, UserServices } from '../../services'
import { RootState } from '../store'
import { history } from '~/utils'

export enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

export const signinAsync = createAsyncThunk('signin', async (user: { username: string; password: string }) => {
  const response = await AuthServices.login(user.username, user.password)
  return response.data
})

export const getCurrentUserAsync = createAsyncThunk('/user/me', async () => {
  const response = await UserServices.getCurrentUser()
  return response.data
})

export const signOutAsync = createAsyncThunk('signout', async () => {
  AuthServices.logout()
})

export interface AuthState {
  user: AuthUser | null
  status?: StatusTypes
  accessToken?: string
  error?: string
}

const initialState: AuthState = {
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signinAsync.pending, (state) => {
      state.status = StatusTypes.LOADING
    })
    builder.addCase(signinAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.accessToken = action.payload.access_token
      state.status = StatusTypes.SUCCESS
    })
    builder.addCase(signinAsync.rejected, (state, action) => {
      state.user = null
      state.status = StatusTypes.ERROR
      state.error = action.error.message
    })

    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.status = StatusTypes.LOADING
    })
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.status = StatusTypes.SUCCESS
      state.error = ''
    })
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.user = null
      state.status = StatusTypes.ERROR
      state.error = action.error.message
    })
    builder.addCase(signOutAsync.fulfilled, (state) => {
      state.user = null
      history.navigate('/')
    })
  }
})

export const { removeUser } = authSlice.actions

export const authState = (state: RootState) => state.auth

export default authSlice.reducer
