import { ReactElement, useEffect, useState } from 'react'
import { Typography, Spin, Row, Col } from 'antd'
import { WishListTable } from '~/components/User/WishList'
import { getWishList, userState } from '~/redux/reducers/userSlice'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
const { Title, Paragraph, Text } = Typography

const Whistlist = () => {
  const [loading, setLoading] = useState(true)
  const { wishlist } = useAppSelector(userState)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = 'Sản phẩm yêu thích'
    disableLoading()

    if (!wishlist.length) {
      dispatch(getWishList())
    }
  }, [])

  const disableLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <section className='tw-relative tw-p-6 tw-min-h-full tw-flex tw-flex-col'>
      <div className='tw-min-h-0'>
        <Row gutter={24} className='tw-mb-8'>
          <Col span={24}>
            <Title level={3} className='tw-mb-0 tw-font-semibold'>
              Sản phẩm yêu thích
            </Title>
          </Col>
          <Col span={24}>
            <Text>Danh sách sản phẩm đã thích</Text>
          </Col>
        </Row>
      </div>
      <div className='tw-flex-1 tw-flex tw-min-h-0'>
        <div className='tw-flex-1'>
          <WishListTable />
        </div>
      </div>
    </section>
  )
}

export default Whistlist
