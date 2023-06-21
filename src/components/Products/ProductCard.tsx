import React, { useMemo } from 'react'
import { config, format3P } from '~/utils'
import { Link } from 'react-router-dom'
import { Image, Modal, Typography } from 'antd'
import { ProductType, WishlistItem } from '~/interfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { setQuickViewProduct } from '~/redux/reducers/productSlide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faPlus } from '@fortawesome/free-solid-svg-icons'
import {} from '~/redux/reducers/cartSlice'
import { addItemToWishlistAsync, removeItemFromWishlistAsync, userState } from '~/redux/reducers/userSlice'
import { authState } from '~/redux/reducers/authSlice'

const { Title, Text } = Typography

interface ProductCardType {
  product: ProductType
  isLandingPage?: boolean
}
const ProductCard: React.FC<ProductCardType> = ({ product, isLandingPage }) => {
  const { id, name, discount_percent = 0, price, photos } = product

  const dispatch = useAppDispatch()
  const { wishlist } = useAppSelector(userState)
  const { user } = useAppSelector(authState)

  const isWishedItem = useMemo(() => {
    if (!Array.isArray(wishlist) || wishlist.length === 0) return false
    return wishlist.find((item) => item.product_id === id) ? true : false
  }, [wishlist])

  const costAfterSale = useMemo(() => {
    return price - (price * discount_percent) / 100
  }, [price, discount_percent])

  const handleAddItemToWishlist = () => {
    if (user) {
      if (isWishedItem) {
        const checkWishlistExists = wishlist.find((wishItem: WishlistItem) => wishItem.product_id === id)
        if (checkWishlistExists) {
          dispatch(removeItemFromWishlistAsync([checkWishlistExists.id]))
        }
      } else {
        dispatch(addItemToWishlistAsync(id))
      }
    } else {
      Modal.warning({
        title: 'Bạn chưa đăng nhập',
        content: 'Vui lòng đăng nhập để thực hiện thao tác này.',
        cancelText: 'Đóng',
        okText: 'Đóng',
        okButtonProps: {
          className: 'tw-bg-primary tw-text-white'
        }
      })
    }
  }
  return (
    <div className='tw-px-3 tw-mb-10 xl:tw-mb-[33px] ' data-test='product-card'>
      <div
        className='tw-relative tw-mb-[14px] tw-group/product tw-transition-all tw-duration-300 tw-ease-linear'
        data-test='product-thumb'
      >
        <Link to={`/san-pham/${id}`}>
          <Image
            src={photos?.length ? photos[0] : `${config.publicUrl}/images/products/product2.jpg`}
            alt={name}
            className={isLandingPage ? 'product-image' : 'tw-w-full tw-h-auto  tw-object-cover'}
            placeholder
            preview={false}
          />
        </Link>

        <Link
          to={`/san-pham/${id}`}
          className='tw-absolute tw-opacity-0 tw-top-0 tw-left-0 tw-invisible group-hover/product:tw-visible group-hover/product:tw-opacity-100 tw-transition-all tw-duration-300'
        >
          <Image
            src={photos?.length ? photos[1] : `${config.publicUrl}/images/products/product1.jpg`}
            alt={name}
            className={isLandingPage ? 'product-image' : 'tw-w-full tw-h-auto  tw-object-cover'}
            preview={false}
          />
        </Link>

        <div
          className='tw-absolute tw-top-2 tw-right-2 tw-duration-300 tw-transition-all tw-opacity-0 tw-invisible group-hover/product:tw-opacity-100 group-hover/product:tw-visible tw-group/action tw-cursor-pointer hover:tw-bg-black'
          data-test='produc-action'
        >
          <div className='tw-relative' data-item='hover-action'>
            <Text className='tw-w-[50px] tw-h-[50px] tw-text-center tw-leading-[50px] tw-bg-white tw-text-[15px] tw-block tw-text-[#999]'>
              <FontAwesomeIcon icon={faPlus} />
            </Text>
            <div className='tw-absolute tw-top-0 tw-left-0 tw-z-10 tw-max-h-0 tw-transition-all tw-duration-300 tw-opacity-100 tw-visible group-hover/action:tw-opacity-100 group-hover/action:tw-visible'>
              <ul className='tw-list-outside tw-list-image-none tw-list-none tw-p-0 tw-m-0'>
                <li onClick={handleAddItemToWishlist}>
                  <Text className={`product-action ${isWishedItem ? 'tw-text-primary' : ''}`}>
                    <FontAwesomeIcon icon={faHeart} />
                  </Text>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='tw-absolute tw-bottom-[15px] tw-left-[10px] tw-right-[10px] tw-rounded-[3px] tw-opacity-0 tw-invisible tw-transition-all tw-duration-300 group-hover/product:tw-opacity-100 group-hover/product:tw-visible'>
          {isLandingPage ? null : (
            <a
              href='#'
              className='tw-leading-[45px] tw-bg-white tw-text-primary tw-px-[10px] tw-font-normal tw-rounded-sm tw-text-[13px] tw-capitalize tw-w-full tw-block tw-text-center'
              onClick={() => dispatch(setQuickViewProduct(product.id))}
            >
              Xem nhanh
            </a>
          )}
        </div>

        <div>
          <div className='tw-absolute tw-top-[15px] tw-left-[15px] tw-bg-[#007a58] tw-px-[13px] tw-rounded-sm'>
            <span className='tw-capitalize tw-text-white'>Mới</span>
          </div>
          {discount_percent !== 0 ? (
            <div className='tw-absolute tw-top-[46px] tw-left-[15px] tw-bg-primary tw-px-[15px] tw-rounded-sm'>
              <span className='tw-capitalize tw-text-white tw-text-xs tw-leading-[23px]'>-{discount_percent}%</span>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <Title
          level={3}
          className='xl:tw-text-xs tw-leading-[22px] tw-text-[13px] tw-font-normal tw-capitalize tw-mb-0'
        >
          <Link to={`/san-pham/${id}`} className='tw-text-[#999] hover:tw-text-primary tw-duration-300'>
            {name}
          </Link>
        </Title>
        <span className='tw-text-[13px] tw-font-medium tw-text-tertiary'>{format3P(costAfterSale)} VNĐ</span>
        {discount_percent > 0 ? (
          <span className='tw-text-[13px] tw-text-[#a4a4a4] tw-ml-[5px] tw-line-through'>{format3P(price)} VNĐ</span>
        ) : null}
      </div>
    </div>
  )
}

export default ProductCard
