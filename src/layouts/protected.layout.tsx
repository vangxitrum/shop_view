import { Button, Col, Layout, Row } from 'antd'
import { useEffect, useLayoutEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from '~/components'
import { Icon } from '~/components/Generals'
import { ProtectedSider } from '~/components/Generals/Sider'
import { useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
const ProtectedLayout = () => {
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false)
  const { user } = useAppSelector(authState)
  const navigate = useNavigate()

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (!user) {
      sessionStorage.removeItem('beforeLogin')
      navigate('/')
    }
  }, [user])

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowStickyHeader(true)
    } else {
      setShowStickyHeader(false)
    }
  }
  return (
    <Layout id='root-layout'>
      <Layout className=' tw-h-screen tw-overflow-hidden tw-flex tw-flex-col tw-bg-white'>
        <Header />
        <div className='tw-container tw-my-3 tw-flex-1'>
          <Row gutter={24} className='tw-min-h-full tw-py-2'>
            <Col span={6}>
              <div className='tw-min-h-full tw-shadow-lg tw-rounded-lg'>
                <ProtectedSider />
              </div>
            </Col>
            <Col span={18}>
              <div className='tw-h-full tw-shadow-lg tw-rounded-lg'>
                <Outlet />
              </div>
            </Col>
          </Row>
        </div>
      </Layout>
      {showStickyHeader ? (
        <Button
          icon={<Icon name='UpOutlined' />}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }
          shape='circle'
          size='large'
          className='tw-fixed tw-z-[2147483647] tw-bottom-[85px] tw-text-lg tw-cursor-pointer tw-h-[45px] tw-bg-black tw-text-white tw-right-[12px] tw-text-center'
        />
      ) : null}
    </Layout>
  )
}

export default ProtectedLayout
