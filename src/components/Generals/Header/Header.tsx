import { Searchbar, Cart, AccountDropdown, Nav, StickyHeader } from '.'
import { Link } from 'react-router-dom'
import { config } from '../../../utils'
import { Button, Col, Image, Row, Space } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Icon } from '..'
import { MobileNav } from '.'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { toggleMobileSiderVisible } from '~/redux/reducers/appSlice'
import { authState } from '~/redux/reducers/authSlice'

export default function CommonHeader() {
  const dispatch = useAppDispatch()
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false)
  const { user } = useAppSelector(authState)

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowStickyHeader(true)
    } else {
      setShowStickyHeader(false)
    }
  }

  return (
    <header
      className='tw-py-5 lg:tw-p-0 tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b tw-border-solid tw-border-[#ddd]'
      id='header'
    >
      <div className='lg:tw-px-[30px]' id='header-mid'>
        <div className='tw-container-fluid'>
          <div className='tw-p-0 lg:tw-py-[43px]' id='mid-inner'>
            <Row gutter={[24, 24]} className='tw-items-center'>
              <Col span={4}>
                <div>
                  <Link to='/'>
                    <Image
                      width={120}
                      height={38}
                      src={`${config.publicUrl}/images/logo/logo.png`}
                      alt='logo'
                      className='tw-max-w-full tw-h-auto'
                      preview={false}
                    />
                  </Link>
                </div>
              </Col>
              <Col span={20}>
                <div className='tw-justify-end tw-items-center tw-hidden lg:tw-flex'>
                  <Space size={30}>
                    <Searchbar />
                    <div>
                      {user ? (
                        <AccountDropdown />
                      ) : (
                        <Space size={12}>
                          <Link className='tw-text-tertiary hover:tw-text-primary' to={'/dang-nhap'}>
                            Đăng nhập
                          </Link>
                        </Space>
                      )}
                    </div>
                    <Cart />
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
          <div
            style={{
              display: 'inherit',
              right: 'inherit'
            }}
            className='tw-absolute tw-left-[279px] tw-top-[39px] tw-z-[999] tw-max-w-[1190px] tw-hidden lg:tw-block'
          >
            <div>
              <nav>
                <Nav />
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => dispatch(toggleMobileSiderVisible(true))}
        icon={<Icon name='BarsOutlined' />}
        className='tw-fixed tw-right-[33px] tw-top-[27px] tw-block lg:tw-hidden'
      />
      <StickyHeader visible={showStickyHeader} />
      <MobileNav />
    </header>
  )
}
