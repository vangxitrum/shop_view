import { store } from '~/redux/store'
import api from './api'
import { clearCart } from '~/redux/reducers/cartSlice'
import { removeUser } from '~/redux/reducers/authSlice'

export const refreshToken = () => {
  return api.get('/authentication/refreshToken')
}

export const login = async (email: string, password: string) => {
  const res: any = await api.post('/auth/sign-in', {
    email,
    password
  })
  if (res.data.access_token) {
    localStorage.removeItem('user')
    localStorage.setItem(
      'user',
      JSON.stringify({
        user: res.data.user,
        accessToken: res.data.access_token,
        refreshToken: res.data.refresh_token
      })
    )
  }
  return res
}

export const logout = () => {
  localStorage.removeItem('user')
  store.dispatch(removeUser())
  store.dispatch(clearCart())
}

const AuthServices = {
  login,
  logout,
  refreshToken
}

export default AuthServices
