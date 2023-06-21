import { Button, Layout } from 'antd'
import { useLayoutEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header, Footer } from '~/components'
import { Icon } from '~/components/Generals'
const PageLayout = () => {
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
    <Layout id='root-layout'>
      <Layout className='tw-flex-1 tw-bg-white'>
        <Header />
        <Outlet />
        <section className='tw-container'>
          <Footer isPageLayout={true} />
        </section>
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

export default PageLayout
