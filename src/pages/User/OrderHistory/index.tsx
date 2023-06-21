import { useEffect, useState } from 'react'
import { Col, Row, Tabs, Typography } from 'antd'
import type { TabsProps } from 'antd'

import { OrderDetail, OrderTable } from '~/components/User/OrderHistory'
import { UserServices } from '~/services'
import { useQuery } from '@tanstack/react-query'
const { Title, Text } = Typography
const OrderHistory = () => {
  const [orderDetail, setOrderDetail] = useState<any>()
  const [order, setOrder] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const { isLoading, isError, isFetching, data, error } = useQuery({
    queryKey: ['products', page],
    queryFn: async () => {
      try {
        const res = await UserServices.getOrder({
          off_set: page,
          limit: 1000
        })
        return res.data
      } catch (error) {
        throw error
      }
    },
    refetchOnWindowFocus: false,
    keepPreviousData: true
  })

  useEffect(() => {
    document.title = 'Lịch sử mua hàng'
  }, [])

  const onShowOrderDetail = (orderId: string) => {
    const orderExist = data.find((or: any) => or.id === orderId)
    if (orderExist) {
      setOrderDetail(orderExist)
    }
  }

  const items: TabsProps['items'] = [
    {
      key: 'all',
      label: `Tất cả`,
      forceRender: true,
      children: <OrderTable data={data} loading={isLoading} showDetail={onShowOrderDetail} />
    },
    {
      key: 'waiting',
      label: `Chờ thanh toán`,
      forceRender: true,
      children: <OrderTable data={data} loading={isLoading} showDetail={onShowOrderDetail} />
    },
    {
      key: 'completed',
      label: `Hoàn thành`,
      forceRender: true,
      children: <OrderTable data={data} loading={isLoading} showDetail={onShowOrderDetail} />
    },
    {
      key: 'cancelled',
      label: `Đã huỷ`,
      forceRender: true,
      children: <OrderTable data={data} loading={isLoading} showDetail={onShowOrderDetail} />
    }
  ]
  const onChange = (key: string) => {
    console.log(key)
  }

  return (
    <section className='tw-relative tw-p-6 tw-min-h-full tw-flex tw-flex-col'>
      <div className='tw-min-h-0'>
        <Row gutter={24} className='tw-mb-8'>
          <Col span={24}>
            <Title level={3} className='tw-mb-0 tw-font-semibold'>
              Lịch sử mua hàng
            </Title>
          </Col>
          <Col span={24}>
            <Text>Quản lý lịch sử mua hàng</Text>
          </Col>
        </Row>
      </div>
      <div className='tw-flex-1 tw-flex tw-min-h-0'>
        <div className='tw-flex-1'>
          <Tabs
            defaultActiveKey='1'
            rootClassName='fit-height-tabs'
            className='tw-h-full tw-overflow-hidden'
            items={items}
            onChange={onChange}
          />
        </div>
      </div>
      <OrderDetail orderDetail={orderDetail} open={orderDetail ? true : false} onClose={() => setOrderDetail(null)} />
    </section>
  )
}

export default OrderHistory
