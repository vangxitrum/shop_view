import { List, PaginationProps } from 'antd'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProductCard from './ProductCard'
import { ProductType } from '~/interfaces'
import 'moment/locale/vi'

const ProductList = ({
  loading,
  page,
  onPageChange,
  products,
  total
}: {
  loading: boolean
  page: number
  onPageChange: Function
  products: ProductType[]
  total: number
}) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <a href='##'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
      )
    }
    if (type === 'next') {
      return (
        <a href='#'>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      )
    }
    return originalElement
  }

  return (
    <List
      header={false}
      loading={loading}
      dataSource={products}
      itemLayout='vertical'
      grid={{ gutter: 24, column: 4 }}
      pagination={{
        current: page || 1,
        pageSize: 12,
        itemRender: itemRender,
        total: total,
        onChange(page) {
          return onPageChange(page)
        },
        className: 'tw-text-center tw-py-2 tw-border tw-rounded-sm ,tw-text-primary'
      }}
      renderItem={(item: ProductType) => {
        return <ProductCard product={item} />
      }}
    />
  )
}

export default ProductList
