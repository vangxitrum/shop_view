interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  size: string
  color: string
  DiscountPercent: number
}

interface AddItemToCartParams {
  product_id: string
  quantity: number
  color: string
  size: string
}

interface UpdateItemInCartParams {
  product_id: string
  quantity: number
}
export type { CartItem, AddItemToCartParams, UpdateItemInCartParams }
