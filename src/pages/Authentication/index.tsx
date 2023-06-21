import { Image, Space, Typography, Tabs } from 'antd'
import React from 'react'
import { config } from '../../utils'
import { SignInForm, RegisterForm } from '../../components/Authentication'

const { Text } = Typography

const Authentication: React.FC<{}> = () => {
  return (
    <main className='tw-h-screen tw-overflow-auto tw-flex tw-flex-col'>
      <header className='tw-h-10'></header>
      <article className='tw-pt-8 tw-pb-6 tw-flex-1'>
        <div className='tw-pt-8 tw-pb-6 tw-h-full tw-flex tw-flex-col'>
          <div className='tw-text-center'>
            <Space size={[16, 0]} direction='vertical'>
              <Image
                width={100}
                height={50}
                src={`${config.publicUrl}/images/logo/logo.png`}
                alt='logo'
                preview={false}
                placeholder={true}
              />
              <Text className='tw-text-3xl tw-text-black tw-leading-10'>Panthers Shop</Text>
            </Space>
          </div>
          <div className='tw-min-w-[328px] max-w-[500px] tw-mx-auto'>
            <Tabs
              defaultActiveKey='1'
              centered
              items={[
                {
                  key: '1',
                  label: <Text className='tw-capitalize tw-font-semibold'>Đăng nhập</Text>,
                  children: <SignInForm />
                },
                {
                  key: '2',
                  label: <Text className='tw-capitalize tw-font-semibold'>Đăng ký</Text>,
                  children: <RegisterForm />
                }
              ]}
            />
          </div>
        </div>
      </article>
      <footer className='tw-bg[##f0f2f5]'>
        <div className='tw-mt-12 tw-mb-6 tw-px-4 tw-text-center'>
          <div className='tw-mb-2'>
            <span>Assistant </span>
            <span>Happy Working </span>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Authentication
