import { AddItemToCartParams, UpdateItemInCartParams, UserAddress } from '~/interfaces'
import apiWithToken from './apiWithToken'
import authHeader from './authHeader'

export const getCurrentUser = async () => {
  return apiWithToken.get('/users/me', {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const getUserAddress = async (params: any) => {
  return apiWithToken.get('/users/address', {
    params,
    headers: {
      Authorization: authHeader()
    }
  })
}

export const createUserAddress = async (params: UserAddress) => {
  return apiWithToken.post('/users/address', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const updateUserAddress = async (params: Partial<UserAddress>) => {
  return apiWithToken.put('/users/address', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const deleteUserAddress = async (addressId: string) => {
  return apiWithToken.delete(`/users/address/${addressId}`, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const getWishList = (params: any) => {
  return apiWithToken.get('/users/wishlist', {
    params,
    headers: {
      Authorization: authHeader()
    }
  })
}

export const addItemToWishlist = (id: string) => {
  return apiWithToken.post(
    '/users/wishlist',
    {
      product_id: id
    },
    {
      headers: {
        Authorization: authHeader()
      }
    }
  )
}

export const removeItemFromWishlist = (params: any) => {
  return apiWithToken.delete('/users/wishlist', {
    data: {
      delete_ids: params
    },
    headers: {
      Authorization: authHeader()
    }
  })
}

export const getCartItems = () => {
  return apiWithToken.get('/cart', {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const addItemToCart = (params: AddItemToCartParams[]) => {
  return apiWithToken.put('/cart', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const updateCartItemQuantity = (params: UpdateItemInCartParams[]) => {
  return apiWithToken.post('/cart', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const removeItemFromCart = (cartItemId: string) => {
  return apiWithToken.delete(`/cart/${cartItemId}`, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const removeAllItemsInCart = () => {
  return apiWithToken.delete('/cart', {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const checkout = (params: any) => {
  return apiWithToken.post('/order/checkout', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const getOrder = (params: any) => {
  return apiWithToken.get('/orders/', {
    params,
    headers: {
      Authorization: authHeader()
    }
  })
}

export const createOrder = (params: any) => {
  return apiWithToken.put('/order', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const getMessages = () => {
  return apiWithToken.get('/message', {
    headers: {
      Authorization: authHeader()
    }
  })
}

export const sendMegessage = (params: any) => {
  return apiWithToken.post('/send-message', params, {
    headers: {
      Authorization: authHeader()
    }
  })
}
