import { Col, Divider, Input, Row, Space } from 'antd'
import { Fragment, useRef, useState } from 'react'
import { Breadcrumb, Icon } from '~/components/Generals'
import { PriceFilter, Categories, ProductList, QuickViewProduct, Brands, Types } from '~/components/Products'
import type { InputRef } from 'antd'
import { useProducts } from '~/hooks/Products/useProducts'

interface FilterState {
  page: number
  page_size: number
  name?: string | undefined
  brands?: []
  types?: []
  genders?: string | undefined
  price?: []
}

const Products = () => {
  const [productFilters, setProductFilters] = useState<FilterState>({
    page: 1,
    page_size: 12,
    genders: ''
  })

  const { data: products, isLoading, isFetching, total } = useProducts(productFilters)
  const searchRef = useRef<InputRef>(null)

  const handleStartSearch = () => {
    setProductFilters((prevProductFilters: any) => ({
      ...prevProductFilters,
      name: searchRef.current?.input?.value.trim()
    }))
  }

  return (
    <Fragment>
      <div className='2xl:tw-py-9'>
        <div className='tw-container'>
          <Breadcrumb />
        </div>
      </div>
      <div className='tw-container tw-pb-9'>
        <Row gutter={[24, 24]}>
          <Col span={24} lg={{ span: 6 }}>
            <div>
              <PriceFilter
                onChange={(values: []) =>
                  setProductFilters((prevFilters: any) => ({
                    ...prevFilters,
                    price: values || undefined
                  }))
                }
              />
              <Brands
                selected={productFilters?.brands || []}
                onChange={(values: []) =>
                  setProductFilters((prevFilters: any) => ({
                    ...prevFilters,
                    brands: values || undefined
                  }))
                }
              />
              <Categories
                selected={productFilters?.genders || ''}
                onChange={(value: string) =>
                  setProductFilters((prevFilters: any) => ({
                    ...prevFilters,
                    genders: value
                  }))
                }
              />
              <Types
                selected={productFilters?.types || []}
                onChange={(values: []) =>
                  setProductFilters((prevFilters: any) => ({
                    ...prevFilters,
                    types: values || undefined
                  }))
                }
              />
            </div>
          </Col>
          <Col span={24} lg={{ span: 18 }}>
            <div className='tw-mb-10'>
              <Space>
                <div className='tw-w-[540px] tw-mx-auto tw-relative'>
                  <Input
                    ref={searchRef}
                    placeholder='Nhập tên sản phẩm'
                    defaultValue={productFilters?.name}
                    size='large'
                    suffix={<Icon name='SearchOutlined' />}
                    className=' tw-rounded-[50px]'
                    onPressEnter={handleStartSearch}
                  />
                </div>
              </Space>
            </div>
            <ProductList
              loading={isFetching || isLoading}
              page={productFilters?.page}
              onPageChange={(page: number) =>
                setProductFilters((prevProductFilters: any) => ({
                  ...prevProductFilters,
                  page
                }))
              }
              products={products || []}
              total={total || 0}
            />
          </Col>
        </Row>
        <Divider />
      </div>
      <QuickViewProduct />
    </Fragment>
  )
}

export default Products
