import React, { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBasket, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { format3P, config } from '../../../utils'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { Button, Col, Divider, Dropdown, Image, List, Row, Space, Typography } from 'antd'
import { CartItem } from '~/interfaces'
import { removeItemInCart } from '~/redux/reducers/cartSlice'
const { Title, Text } = Typography
const Tax = 10

const Cart: React.FC<{}> = ({}) => {
  const { items } = useAppSelector((state) => state.cart)
  const [products, setProducts] = useState<CartItem[]>([])
  const navigate = useNavigate()
  const cartContentRef = useRef<HTMLDivElement>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setProducts(items)
  }, [items])

  const calculateTotalBeforeTax = useMemo(() => {
    let total = 0
    if (products.length) {
      products.map((product: CartItem) => (total += product.price * product.quantity))
    }
    return total
  }, [products])

  const calculateTotalAfterTax = useMemo(() => {
    let total = 0
    if (products.length) {
      products.map((product: CartItem) => (total += product.price * product.quantity))
    }
    if (Tax <= 0) {
      return total
    } else {
      let vatValue = (total * Tax) / 100
      return total + vatValue
    }
  }, [products, Tax])

  const removeItemFromCart = (id: string) => {
    dispatch(removeItemInCart(id))
  }

  const renderCartItem = (cartItem: CartItem) => {
    return (
      <div className='tw-flex tw-overflow-hidden tw-py-[25px] first-of-type:tw-pt-0 tw-border-b'>
        <div className='tw-w-[30%] tw-mr-[15px] tw-float-left'>
          <Image
            src={cartItem.image}
            alt={`cart-item-${cartItem.id}`}
            className='tw-h-auto'
            width={83}
            height={98}
            preview={false}
            placeholder={true}
          />
        </div>
        <div className='tw-w-60% tw-float-right'>
          <Link to={`/san-pham/${cartItem.id}`}>
            <Text className='tw-text-secondary tw-text-[13px] tw-font-semibold hover:!tw-text-primary tw-block'>
              {cartItem.name}
            </Text>
            <Text className='tw-block'>{`${cartItem.quantity} x ${format3P(cartItem.price)} VNĐ`}</Text>
            <Text className='tw-block tw-text-secondary tw-text-[13px]'>
              Kích Thước: <span className='tw-uppercase'>{cartItem.size}</span>
            </Text>
            <Text className='tw-block tw-text-secondary tw-text-[13px]'>
              Màu Sắc: <span className=''>{cartItem.color}</span>
            </Text>
          </Link>
        </div>
        <div className='tw-w-[10%] tw-text-center'>
          <FontAwesomeIcon
            icon={faTimes}
            role='button'
            className='tw-text-xl tw-cursor-pointer'
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              removeItemFromCart(cartItem.id)
            }}
          />
        </div>
      </div>
    )
  }

  const itemsDropdowns = useMemo(() => {
    return [
      {
        key: '1',
        label: (
          <List
            className='tw-w-[345px] tw-max-h-[450px] tw-overflow-y-auto tw-p-2 tw-cursor-default'
            dataSource={products}
            renderItem={(product: CartItem) => renderCartItem(product)}
          />
        )
      },
      {
        key: '2',
        label: (
          <Space size={[12, 0]} direction='vertical' className='tw-w-[350px]'>
            <Row className='tw-flex tw-items-center tw-justify-between' gutter={12}>
              <Col span={12}>
                <Title className='tw-inline tw-font-semibold' level={5}>
                  {'Tổng tiền :'}{' '}
                </Title>
              </Col>
              <Col span={12} className='tw-text-right'>
                <Text className='tw-font-bold'>{`${calculateTotalBeforeTax} VNĐ`}</Text>
              </Col>

              <Col span={24}>
                <Divider className='tw-my-2' />
              </Col>
              <Col span={12}>
                <Title level={5}>{'Tổng tiền phải trả:'}</Title>
              </Col>
              <Col span={12} className='tw-text-right'>
                {' '}
                <Text className='tw-font-bold'>{`${calculateTotalAfterTax} VNĐ`}</Text>
              </Col>
              <Col span={12}>
                <Button
                  className='tw-min-w-[120px] hover:!tw-bg-primary hover:!tw-text-white tw-my-2'
                  href='/gio-hang'
                  size='large'
                >
                  Giỏ hàng
                </Button>
              </Col>
              <Col span={12} className='tw-text-right'>
                <Button
                  size='large'
                  href='/thanh-toan'
                  className='tw-min-w-[120px] hover:!tw-bg-primary hover:!tw-text-white tw-my-3'
                >
                  Thanh toán
                </Button>
              </Col>
            </Row>
          </Space>
        )
      }
    ]
  }, [products])

  return (
    <Dropdown
      menu={{ items: itemsDropdowns }}
      getPopupContainer={() => document.body}
      autoAdjustOverflow={true}
      trigger={['click', 'hover']}
      dropdownRender={() => {
        return (
          <div
            ref={cartContentRef}
            className='tw-w-[345px] !tw-py-[30px] !tw-px-6 ant-dropdown-menu ant-dropdown-menu-root ant-dropdown-menu-vertical ant-dropdown-menu-light css-dev-only-do-not-override-htwhyh'
          >
            <div className='!tw-px-0 ' role='menuitem'>
              <List
                className='tw-max-h-[450px] tw-overflow-y-auto tw-cursor-default'
                dataSource={products}
                renderItem={(product: CartItem) => renderCartItem(product)}
              />
            </div>
            <div className='tw-py-[19px]'>
              <Space size={[12, 0]} direction='vertical'>
                <Row className='tw-flex tw-items-center tw-justify-between' gutter={12}>
                  <Col span={12}>
                    <Title className='tw-text-[#242424] tw-pb-[6px] tw-capitalize tw-inline !tw-font-normal' level={5}>
                      {'Tổng tiền :'}{' '}
                    </Title>
                  </Col>
                  <Col span={12} className='tw-text-right'>
                    <Text className='!tw-font-semibold tw-text-sm tw-pb-[6px]'>
                      {`${format3P(calculateTotalBeforeTax)} VNĐ`}
                    </Text>
                  </Col>
                  <Col span={12}>
                    <Title level={5} className='tw-text-[#242424] tw-pb-[6px] tw-capitalize tw-inline !tw-font-normal'>
                      {'Tổng tiền phải trả:'}
                    </Title>
                  </Col>
                  <Col span={12} className='tw-text-right'>
                    {' '}
                    <Text className='!tw-font-semibold tw-text-base tw-text-primary tw-pb-[6px]'>
                      {`${format3P(calculateTotalAfterTax)} VNĐ`}
                    </Text>
                  </Col>
                </Row>
              </Space>
            </div>
            <div className='tw-block tw-pb-[25px] '>
              <Button
                block
                className='tw-block tw-capitalize tw-font-semibold tw-text-[#242424] tw-bg-[#f6f6f6] tw-text-center tw-mb-0 hover:!tw-text-white hover:!tw-bg-black'
                onClick={() => {
                  navigate('/gio-hang')
                }}
                size='large'
              >
                Giỏ hàng
              </Button>
            </div>
            <div className='tw-block tw-pb-[25px]'>
              <Button
                block
                size='large'
                onClick={() => {
                  navigate('/thanh-toan')
                }}
                className='tw-block tw-capitalize tw-font-semibold tw-text-[#242424] tw-bg-[#f6f6f6] tw-text-center tw-mb-0 hover:!tw-text-white hover:!tw-bg-black'
              >
                Thanh toán
              </Button>
            </div>
          </div>
        )
      }}
    >
      <a
        onClick={(e) => {
          e.preventDefault()
        }}
        className='tw-text-xs tw-font-light tw-capitalize tw-text-secondary tw-border tw-border-solid tw-border-[#ddd] tw-pt-[10px] tw-pb-2 tw-px-[17px] tw-block tw-rounded-[30px] hover:tw-text-primary'
      >
        <FontAwesomeIcon icon={faShoppingBasket} className='tw-mr-2 tw-text-[17px]' />
        {`${products.length} sản phẩm`}
      </a>
    </Dropdown>
  )
}

export default Cart
