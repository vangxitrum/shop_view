import instance from './api'

export const getProductBrands = () => {
  return instance.get('/products/brands')
}

export const getProductTypes = () => {
  return instance.get('/products/types')
}

export const getProducts = (params: any) => {
  return instance.get('/products', {
    params
  })
}

export const getDetailProduct = (id: string) => {
  return instance.get(`/product/${id}`)
}

export const getCouponValue = (coupon: string) => {
  return instance.get(`/coupon/${coupon}`)
}
