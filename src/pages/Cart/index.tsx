import { useEffect, useState, useMemo } from 'react'
import {
  Breadcrumb,
  Col,
  Row,
  Table,
  Space,
  Image,
  Typography,
  InputNumber,
  Input,
  Divider,
  message,
  Button,
  Modal
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CartItem } from '~/interfaces'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { format3P } from '~/utils'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { cartState, removeAllItems, removeItemInCart, setCheckoutData } from '~/redux/reducers/cartSlice'
import { Icon } from '~/components/Generals'
import { ProductServices, UserServices } from '~/services'

const { Title, Text } = Typography

const Cart = () => {
  const { items, deleteLoading } = useAppSelector(cartState)
  const [discount, setDiscount] = useState<number>(0)
  const [couponCode, setCouponCode] = useState<string>('')
  const [messageApi, contextHolder] = message.useMessage()
  const dispatch = useAppDispatch()
  const [modal, contextModalHolder] = Modal.useModal()
  const navigate = useNavigate()
  const [appliedCouponCode, setAppliedCouponCode] = useState<string[]>([])

  useEffect(() => {
    document.title = 'Giỏ hàng - Panthers Shop'
  }, [])

  const calculateTotal = useMemo(() => {
    let total = 0
    if (items.length) {
      total = items.reduce((accumulator, currentItem) => {
        const realPrice = currentItem?.price - currentItem?.price * currentItem?.DiscountPercent
        return accumulator + realPrice * currentItem.quantity
      }, 0)
    }
    return total
  }, [items])

  const handleUpdateItemQuantity = (_keyInCart: string, _value: number | null) => {
    // setCartItems((items) => {
    //   const updatedItems = items.map((item) => {
    //     if (item.id === keyInCart) {
    //       return {
    //         ...item,
    //         quantity: value || 0
    //       }
    //     }
    //     return item
    //   })
    //   return updatedItems
    // })
  }

  const confirmDeleteAllCartItem = () => {
    modal.confirm({
      title: 'Xoá tất cả',
      icon: <Icon name='ExclamationCircleOutlined' />,
      content: 'Bạn chắc chắn muốn xoá tất cả san phẩm trong giỏ hàng chứ?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk() {
        dispatch(removeAllItems())
      }
    })
  }

  const handleEnterCode = async () => {
    if (appliedCouponCode.includes(couponCode)) {
      setCouponCode('')
      messageApi.error('Mã giảm giá đã được áp dụng!')
      return
    }
    if (couponCode) {
      try {
        const res = await ProductServices.getCouponValue(couponCode)
        const discountPercent = res.data.discount_percent
        const discountCode = res.data.code
        const discountAmount = calculateTotal - calculateTotal * discountPercent
        setAppliedCouponCode(appliedCouponCode.concat(discountCode))
        setDiscount((prevDiscount) => prevDiscount + discountAmount)
        messageApi.success('Áp dụng thành công !')
      } catch (error) {
        messageApi.error('Mã không hợp lệ !')
      } finally {
        setCouponCode('')
      }
    }
  }

  const columns: ColumnsType<CartItem> = [
    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          Hình ảnh
        </Text>
      ),
      dataIndex: 'image',
      align: 'center',
      key: 'image',
      render: (image) => <Image src={image} alt={``} placeholder={true} preview={false} width={83} height={98} />
    },
    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          Sản phẩm
        </Text>
      ),
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          Thông tin
        </Text>
      ),
      key: 'info',
      dataIndex: 'info',

      render(_value, record, _index) {
        return (
          <Space direction='vertical'>
            <Text className='tw-text-secondary'>
              Kích thước: <span className='tw-uppercase tw-font-semibold'>{record.size}</span>
            </Text>
            <Text className='tw-text-secondary'>
              Màu sắc: <span className='tw-uppercase tw-font-semibold'>{record.color}</span>
            </Text>
          </Space>
        )
      }
    },
    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          đơn giá
        </Text>
      ),
      dataIndex: 'price',
      key: 'price',
      render(_value, record, _index) {
        return (
          <Text className='tw-text-secondary tw-min-w-[160px] tw-text-sm tw-font-semibold'>
            {format3P(record.price)} VNĐ
          </Text>
        )
      }
    },

    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          Số lượng
        </Text>
      ),
      key: 'quantity',
      render: (_, record) => (
        <Space size='middle'>
          <InputNumber value={record.quantity} onChange={(value) => handleUpdateItemQuantity(record.id, value)} />
        </Space>
      )
    },
    {
      title: (
        <Text className='tw-block tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>
          thành tiền
        </Text>
      ),
      dataIndex: 'total',
      key: 'total',
      render(_value, record, _index) {
        return (
          <Text className='tw-text-primary tw-min-w-[160px] tw-text-lg tw-font-semibold'>
            {format3P(record.quantity * record.price)} VNĐ
          </Text>
        )
      }
    },
    {
      title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>#</Text>,
      key: 'action',
      align: 'center',
      render: (_, _record) => (
        <Space size='middle'>
          <FontAwesomeIcon
            className='tw-cursor-pointer tw-text-red-600'
            role='button'
            icon={faTrashCan}
            onClick={() => {
              dispatch(removeItemInCart(_record.id))
            }}
          />
        </Space>
      )
    }
  ]

  const handleCheckout = () => {
    dispatch(
      setCheckoutData({
        total: calculateTotal - discount,
        couponCode: appliedCouponCode
      })
    )
    navigate('/thanh-toan')
  }

  return (
    <div className='tw-container'>
      {contextHolder}
      {contextModalHolder}
      <Breadcrumb
        className='tw-text-sm tw-py-11'
        items={[
          {
            title: 'Trang chủ',
            href: '/',
            className: 'hover:tw-text-primaryOrange'
          },
          { title: 'Giỏ hàng' }
        ]}
      />
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Table
            className='tw-border-2 first:!tw-fixedtw-border-b-4'
            columns={columns}
            dataSource={items?.map((item: any) => ({
              ...item,
              key: item.id
            }))}
            pagination={false}
            scroll={{ y: 524 }}
            footer={() => {
              return (
                <div>
                  <Button
                    disabled={deleteLoading}
                    loading={deleteLoading}
                    onClick={() => confirmDeleteAllCartItem()}
                    className='tw-ml-auto tw-block tw-bg-black tw-text-white hover:!tw-bg-primary hover:!tw-text-white tw-font-semibold tw-text-xs tw-capitalize'
                    size='large'
                  >
                    Xoá tất cả
                  </Button>
                </div>
              )
            }}
          />
        </Col>
        <Divider />

        <Col span={12} className='tw-px-4'>
          <Row gutter={[0, 24]} className='tw-bg-[#fafafa]'>
            <Col span={24}>
              <div className='tw-py-3 tw-bg-[#242424] tw-px-4'>
                <Title level={3} className='tw-capitalize !tw-text-white !tw-text-base tw-mb-0'>
                  mã giảm giá (COUPON)
                </Title>
              </div>
            </Col>
            <Col span={24} className='tw-px-4'>
              <Text>Nhập mã giảm giá nếu có.</Text>
            </Col>
            <Col span={24} className='tw-px-4 tw-mb-6'>
              <div className='tw-w-1/2 tw-inline-block'>
                <Input
                  placeholder='Mã giảm giá ...'
                  size='large'
                  value={couponCode}
                  onPressEnter={() => handleEnterCode()}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
              </div>
              <Button
                size='large'
                onClick={handleEnterCode}
                className='tw-ml-6 tw-inline-block tw-font-semibold tw-bg-black !tw-text-white hover:!tw-bg-primary'
              >
                Áp dụng mã
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={12} className='tw-px-4'>
          <Row gutter={[0, 24]} className='tw-bg-[#fafafa]'>
            <Col span={24} className='tw-py-3 tw-bg-black tw-px-4'>
              <Title level={3} className='tw-capitalize !tw-text-white !tw-text-base tw-mb-0'>
                thành tiền
              </Title>
            </Col>
            <Col span={12} className='tw-px-4'>
              <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>tổng tiền</Text>
            </Col>
            <Col span={12} className='tw-text-right tw-px-4'>
              <Text className='tw-text-lg tw-font-semibold'>{format3P(calculateTotal)} VNĐ</Text>
            </Col>
            <Col span={12} className='tw-px-4'>
              <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>giảm giá</Text>
            </Col>
            <Col span={12} className='tw-text-right tw-px-4'>
              <Text className='tw-text-lg tw-font-semibold tw-text-red-500'> -{format3P(discount)} VNĐ</Text>
            </Col>
            <Col span={12} className='tw-px-4'>
              <Text className='tw-text-sm tw-capitalize tw-font-semibold tw-text-[#242424]'>thành tiền</Text>
            </Col>
            <Col span={12} className='tw-text-right tw-px-4 tw-mb-6'>
              <Text className='tw-text-lg tw-font-semibold tw-text-primary'>
                {format3P(calculateTotal - discount)} VNĐ
              </Text>
            </Col>
            <Col span={12} offset={12} className='tw-text-right tw-px-4 tw-mb-6'>
              <Button
                onClick={() => handleCheckout()}
                className='tw-ml-6 tw-inline-block tw-font-semibold tw-bg-black !tw-text-white hover:!tw-bg-primary'
                size='large'
              >
                Thanh toán ngay
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Divider />
    </div>
  )
}

export default Cart
