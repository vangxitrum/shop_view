import { useCallback, useEffect, useState } from 'react'
import { Button, Col, Form, InputNumber, Modal, Row, Select, Typography, Image, Skeleton } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { productState, setQuickViewProduct } from '~/redux/reducers/productSlide'
import { format3P } from '~/utils'
import { Icon } from '../Generals'
import { ProductType } from '~/interfaces'
import { ProductServices } from '~/services'
import { addItemToCartAsync } from '~/redux/reducers/cartSlice'
import { authState } from '~/redux/reducers/authSlice'
interface QuantityType {
  color: string
  detail_id: string
  id: string
  quantity: number
  size: string
}
const { Title, Text, Paragraph } = Typography
const QuickViewProduct = () => {
  const [form] = Form.useForm()
  const { quickViewProductId } = useAppSelector(productState)
  const { user } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const [indexImage, setIndexImage] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [product, setProduct] = useState<ProductType>()
  const [sizes, setSizes] = useState<any>()
  const [colors, setColors] = useState<string[]>([])
  const colorValue = Form.useWatch('color', form)

  const calcDiscountPrice = useCallback((originPrice?: number, discountAmount?: number, discountPercent?: number) => {
    if (originPrice) {
      let totalDiscountAmount = 0
      if (discountAmount) {
        totalDiscountAmount += discountAmount
      }
      if (discountPercent) {
        totalDiscountAmount += (originPrice * discountPercent) / 100
      }
      return format3P(originPrice - totalDiscountAmount)
    } else {
      return format3P(0)
    }
  }, [])

  const getDetailProduct = async (id: string) => {
    try {
      setLoading(true)
      const res = await ProductServices.getDetailProduct(id)
      setProduct(res.data)
      handleProductQuantites(res.data?.product_quantities)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleProductQuantites = (quantites: QuantityType[]) => {
    let colors: string[] = []
    let sizes: any = {}

    quantites.forEach((quantity: QuantityType) => {
      if (!colors.includes(quantity.color)) {
        colors.push(quantity.color)
      }
    })

    colors.map((color: string) => {
      let sizesOfColor = quantites
        .map((quantity: QuantityType) => {
          if (quantity.color === color && quantity.size !== undefined) {
            return quantity.size
          }
        })
        .filter((size: string | undefined) => size !== undefined)
      sizes[color] = sizesOfColor
    })
    setSizes(sizes)
    setColors(colors)
  }

  const addItemToCard = (values: any) => {
    if (product?.id) {
      const item = {
        product_id: product?.id,
        quantity: values.quantity,
        color: values.color,
        size: values.size
      }
      if (user) {
        dispatch(addItemToCartAsync([item]))
      } else {
        Modal.warning({
          title: 'Bạn chưa đăng nhập',
          content: 'Vui lòng đăng nhập để thực hiện thao tác này.',
          cancelText: 'Đóng',
          okText: 'Đóng'
        })
      }
    }
  }

  useEffect(() => {
    if (quickViewProductId) {
      getDetailProduct(quickViewProductId)
    }
  }, [quickViewProductId])

  return (
    <Modal
      title={false}
      open={quickViewProductId ? true : false}
      footer={false}
      closable
      width={1000}
      onCancel={() => dispatch(setQuickViewProduct(undefined))}
    >
      <div className='tw-container'>
        <Row gutter={24}>
          <Col span={24} md={{ span: 10 }}>
            <div>
              <div>
                <div>
                  <Image
                    src={product?.photos ? product?.photos[indexImage] : ''}
                    placeholder
                    width={355}
                    height={417}
                  />
                </div>
                <div className='tw-grid tw-gap-1 tw-grid-cols-4 tw-mt-2 tw-cursor-pointer'>
                  {product?.photos?.slice(0, 4)?.map((image, index) => {
                    return (
                      <div
                        className='tw-col-span-1'
                        key={`product-image-${index}`}
                        onClick={() => setIndexImage(index)}
                      >
                        <Image
                          preview={false}
                          className='tw-select-none'
                          alt={`product-image-${index}`}
                          width={`86px`}
                          height={`100px`}
                          src={image}
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </Col>
          <Col span={24} md={{ span: 14 }}>
            <Skeleton loading={loading} active avatar>
              <div className=''>
                <Title
                  level={2}
                  className='tw-text-base tw-uppercase tw-font-semibold tw-mb-[14px] tw-text-tertiary tw-leading-[26px] tw-mt-0'
                >
                  {product?.name}
                </Title>
              </div>
              <div className='tw-mb-3'>
                <Text className='tw-font-semibold tw-text-primary tw-text-base'>
                  {calcDiscountPrice(product?.price, product?.discount_amount, product?.discount_percent)}
                </Text>
                <Text className='tw-text-secondary tw-text-sm tw-line-through tw-ml-[5px]'>{product?.price}</Text>
                <Text className='tw-ml-2 tw-text-secondary tw-font-semibold'>VNĐ</Text>
              </div>
              <div className='tw-mb-[19px]'>
                <Paragraph className='tw-leading-6 tw-text-[15px] tw-text-secondary tw-m-0'>
                  {product?.description}
                </Paragraph>
              </div>
              <div>
                <Form
                  layout='vertical'
                  form={form}
                  onFinish={(values) => addItemToCard(values)}
                  initialValues={{
                    quantity: 1
                  }}
                >
                  <Form.Item
                    label={
                      <Title
                        level={2}
                        className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                      >
                        Kích Thước
                      </Title>
                    }
                    name='color'
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Chọn ít nhất một màu'
                      }
                    ]}
                  >
                    <Select
                      size='large'
                      placeholder='Chọn màu sắc'
                      options={colors.map((color) => ({ value: color, label: color }))}
                    />
                  </Form.Item>
                  <Form.Item
                    name='size'
                    label={
                      <Title
                        level={2}
                        className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                      >
                        Kích Thước
                      </Title>
                    }
                    required
                    rules={[
                      {
                        required: true,
                        message: 'Chọn ít nhất một kích thước'
                      }
                    ]}
                  >
                    <Select
                      disabled={!form.getFieldValue('color')}
                      options={
                        colorValue
                          ? sizes[colorValue]?.map((size: string) => ({
                              label: size,
                              value: size
                            }))
                          : []
                      }
                      size='large'
                      placeholder='Chọn ít nhất một kích thước'
                    />
                  </Form.Item>
                  <div className='tw-flex tw-items-end tw-gap-2.5'>
                    <Form.Item
                      name='quantity'
                      label={
                        <Title
                          level={2}
                          className='tw-text-base tw-text-tertiary tw-font-semibold tw-uppercase tw-mb-[7px] tw-leading-5'
                        >
                          Số Lượng
                        </Title>
                      }
                    >
                      <InputNumber size='large' min={1} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        htmlType='submit'
                        type='primary'
                        className='tw-bg-black tw-font-bold tw-uppercase hover:tw-text-white hover:tw-bg-primary'
                        size='large'
                        icon={<Icon name='ShoppingCartOutlined' className='tw-text-xl tw-mr-2' />}
                      >
                        Thêm vào giỏ hàng
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
                <div></div>
              </div>
            </Skeleton>
          </Col>
        </Row>
      </div>
    </Modal>
  )
}

export default QuickViewProduct
