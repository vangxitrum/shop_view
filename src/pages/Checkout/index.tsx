import { useEffect, useState, useMemo } from 'react'
import { Breadcrumb, Col, Row, Table, Space, Image, Typography, Button, Tag, Radio, Modal, Result } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { CartItem, UserAddress } from '~/interfaces'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { format3P } from '~/utils'
import type { RadioChangeEvent } from 'antd'
import { AddressSelector } from '~/components/Checkout'
import { getUserAddress, userState } from '~/redux/reducers/userSlice'
import { UserServices } from '~/services'
import { cartState, clearCart, setCheckoutData } from '~/redux/reducers/cartSlice'
import { useNavigate } from 'react-router-dom'
const { Title, Text } = Typography

const columns: ColumnsType<CartItem> = [
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Hình ảnh</Text>,
    dataIndex: 'image',
    align: 'center',
    key: 'image',
    render: (image) => <Image src={image} alt={``} placeholder={true} preview={false} width={83} height={98} />
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Sản phẩm</Text>,
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>đơn giá</Text>,
    dataIndex: 'price',
    key: 'price',
    align: 'center',
    render(_value, record, _index) {
      return (
        <Text className='tw-text-secondary tw-min-w-[160px] tw-text-sm tw-font-semibold'>
          {format3P(record.price)} VNĐ
        </Text>
      )
    }
  },
  {
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Thông tin</Text>,
    key: 'info',
    dataIndex: 'info',
    align: 'center',
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
    title: <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>Số lượng</Text>,
    key: 'quantity',
    align: 'center',
    dataIndex: 'quantity'
  },
  {
    title: (
      <Text className='tw-uppercase tw-text-secondary tw-text-sm tw-text-center tw-font-semibold'>thành tiền</Text>
    ),
    dataIndex: 'total',
    align: 'center',
    key: 'total',
    render(_value, record, _index) {
      return (
        <Text className='tw-text-primary tw-min-w-[160px] tw-text-lg tw-font-semibold'>
          {format3P(record.quantity * record.price)} VNĐ
        </Text>
      )
    }
  }
]

const Checkout = () => {
  const { items, checkoutData } = useAppSelector(cartState)
  const [paymentMethod, setPaymentMethod] = useState<string>('COD')
  const [addressModalVisibility, setAddressModalVisibility] = useState<boolean>(false)
  const [modal, contextHolder] = Modal.useModal()
  const [currentAddress, setCurrentAddress] = useState<UserAddress>()
  const { address } = useAppSelector(userState)
  const dispatch = useAppDispatch()
  const [resultModalVisible, setResultModalVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Thanh toán - Panthers Shop'
    if (!address.length) {
      dispatch(getUserAddress())
    }
  }, [])

  useEffect(() => {
    if (address.length) {
      setCurrentAddress(address.find((address) => address.is_default) || address[0])
    } else {
    }
  }, [address])

  const totalProductPrice = useMemo(() => {
    if (checkoutData && checkoutData.total) {
      return checkoutData.total
    }
    let total = 0
    if (items.length) {
      total = items.reduce((accumulator, currentItem) => {
        const realPrice = currentItem?.price - currentItem?.price * currentItem?.DiscountPercent
        return accumulator + realPrice * currentItem.quantity
      }, 0)
    }
    return total
  }, [items, checkoutData])

  const onSelectPaymentMethod = (e: RadioChangeEvent) => {
    setPaymentMethod(e.target.value)
  }

  const handleCheckout = async () => {
    try {
      setLoading(true)
      const params = {
        address_id: currentAddress?.id,
        payment_method: paymentMethod,
        coupon_codes: checkoutData?.couponCode || []
      }
      const res = await UserServices.createOrder(params)
      const { payment_info } = res.data
      dispatch(setCheckoutData(null))
      dispatch(clearCart())
      if (payment_info?.payment_method === 'ZALO_PAY') {
        console.log('payment_info?.payment_method', payment_info)
        window.open(payment_info?.order_url, '_blank')
      } else {
        setResultModalVisible(true)
      }
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='tw-container tw-pb-14'>
      {contextHolder}
      <Breadcrumb
        className='tw-text-sm tw-py-11'
        items={[
          {
            title: 'Trang chủ',
            href: '/',
            className: 'hover:tw-text-primaryOrange'
          },
          { title: 'Thanh toán' }
        ]}
      />
      <Row className='tw-shadow-md tw-pb-6 ' gutter={[20, 20]}>
        <Col span={24}>
          <div className='tw-py-3 tw-bg-[#242424] tw-px-4'>
            <Title level={3} className='tw-capitalize !tw-text-white !tw-text-base tw-mb-0'>
              <FontAwesomeIcon icon={faMapMarkerAlt} className='tw-mr-2' />
              Địa chỉ nhận hàng
            </Title>
          </div>
        </Col>
        <Col span={24} className='tw-px-[30px]'>
          <Space>
            <Text className='tw-text-lg tw-text-secondary tw-font-bold'>{`Trần Quan Tuấn (+84) 902364524`}</Text>
            <Text className=' tw-text-lg tw-text-secondary'>
              {`${currentAddress?.address || currentAddress?.status}`}
              {currentAddress?.is_default && (
                <Tag className='tw-ml-2 tw-text-base' color='magenta'>
                  {` `}Mậc định
                </Tag>
              )}
            </Text>
            <Button className='' size='middle' onClick={() => setAddressModalVisibility(true)}>
              Thay đổi
            </Button>
          </Space>
        </Col>
      </Row>

      <Row className='tw-shadow-md tw-pb-6 tw-mt-3' gutter={[20, 20]}>
        <Col span={24}>
          <div className='tw-py-3 tw-bg-[#242424] tw-px-4'>
            <Title level={3} className='tw-capitalize !tw-text-white !tw-text-base tw-mb-0'>
              <FontAwesomeIcon icon={faMapMarkerAlt} className='tw-mr-2' />
              Sản phẩm{' '}
            </Title>
          </div>
        </Col>
        <Col span={24} className='tw-px-[30px]'>
          <Table
            className='tw-border-2 first:!tw-fixedtw-border-b-4'
            columns={columns}
            dataSource={items?.map((item: any) => ({ ...item, key: item.id }))}
            pagination={false}
          />
        </Col>
      </Row>

      <Row className='tw-shadow-md tw-pb-6 tw-mt-3' gutter={[20, 20]}>
        <Col span={24}>
          <div className='tw-py-3 tw-bg-[#242424] tw-px-4'>
            <Title level={3} className='tw-capitalize !tw-text-white !tw-text-base tw-mb-0'>
              Phương thức thanh toán{' '}
            </Title>
          </div>
        </Col>
        <Col span={12} className='tw-px-[30px]'>
          <Radio.Group onChange={onSelectPaymentMethod} value={paymentMethod}>
            <Space direction='vertical'>
              <Radio value={'COD'}>COD - Thanh toán trực tiếp khi nhận hàng</Radio>
              <Radio value={'ZALO_PAY'}>ZaloPay - Thanh toán thông qua kênh ZaloPay</Radio>
            </Space>
          </Radio.Group>
        </Col>
        <Col span={12} className='tw-text-right'>
          <Space direction='vertical'>
            <Space className='tw-flex tw-items-center tw-justify-between tw-mb-2'>
              <Text className='tw-text-lg tw-text-secondary tw-font-bold'>Thành tiền</Text>
              <Text className='tw-text-right tw-text-base tw-text-primary tw-font-bold'>
                {format3P(totalProductPrice)} VNĐ
              </Text>
            </Space>
            <Button
              disabled={loading}
              loading={loading}
              size='large'
              onClick={() => handleCheckout()}
              className='tw-block tw-w-full tw-bg-black hover:tw-bg-primary !tw-text-white tw-font-semibold hover:tw-text-white'
            >
              Thanh toán
            </Button>
          </Space>
        </Col>
      </Row>

      <AddressSelector
        addressModalVisibility={addressModalVisibility}
        address={address}
        currentAddress={currentAddress}
        onCloseModal={() => {
          setAddressModalVisibility(false)
        }}
        onConfirm={(value: number | string) => {
          setCurrentAddress(address.find((address) => address.id === value))
          setAddressModalVisibility(false)
        }}
      />

      <Modal open={resultModalVisible} onCancel={() => {}} footer={false} closable={false}>
        <Result
          status='success'
          title='Đặt hàng thành công!'
          subTitle='Chúng tôi đã ghi nhận đơn hàng của bạn và sẽ liên hệ trong thời gian gần nhất.'
          extra={[
            <Button type='primary' key='console' onClick={() => navigate('/')}>
              Tiếp tục mua hàng
            </Button>
          ]}
        />
      </Modal>
    </div>
  )
}

export default Checkout
