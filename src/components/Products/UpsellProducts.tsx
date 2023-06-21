import { Col, Row, Typography } from 'antd'
import { useEffect, useState } from 'react'
import 'moment/locale/vi'
import ProductCard from './ProductCard'
import { ProductType } from '~/interfaces'
const { Title, Text } = Typography
const RelativeBlogs = () => {
  const [relativeProduct, setRelativeProduct] = useState<ProductType[]>([])

  useEffect(() => {
    setRelativeProduct([])
  }, [])

  return (
    <div className='related_posts'>
      <Title className='tw-border-none tw-text-center !tw-mb-2' level={2}>
        Sản phẩm bán chạy
      </Title>
      <Text className='tw-text-center tw-w-full tw-block tw-mb-4'>Những sản phẩm bán chạy nhất</Text>
      <Row gutter={[24, 24]}>
        {relativeProduct.map((product: ProductType) => (
          <Col span={24} md={{ span: 12 }} lg={{ span: 6 }} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default RelativeBlogs
