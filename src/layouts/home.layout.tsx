import { Button, Layout } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '~/components'
import { Icon } from '~/components/Generals'
import { ChatBox } from '~/components/Widgets'
const HomeLayout = () => {
  const [showStickyHeader, setShowStickyHeader] = useState<boolean>(false)

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
    <Layout id='root-layout' className='tw-relative'>
      <Layout className='tw-flex-1 tw-bg-white'>
        <Header />
        <Outlet />
        <Footer />
      </Layout>
      {showStickyHeader ? (
        <Button
          icon={<Icon name='UpOutlined' className='tw-text-sm' />}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }
          shape='circle'
          className='tw-fixed tw-z-[2147483647] tw-bottom-[55px] tw-cursor-pointer tw-h-[35px] tw-w-[35px] tw-bg-black tw-text-white tw-right-[12px] tw-text-center'
        />
      ) : null}
      <ChatBox />
    </Layout>
  )
}

export default HomeLayout
