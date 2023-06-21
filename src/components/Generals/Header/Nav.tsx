import React, { useEffect, useState } from 'react'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'

const menus = [
  {
    key: '/',
    label: 'Trang chủ',
    path: '/'
  },
  {
    key: '/san-pham',
    label: 'Sản phẩm',
    path: '/san-pham'
  },
  // {
  //   key: '/bai-viet',
  //   label: 'Tin tức',
  //   path: '/bai-viet'
  // },
  {
    key: '/gioi-thieu',
    label: 'Về chúng tôi',
    path: '/gioi-thieu'
  },
  {
    key: '/lien-he',
    label: 'Liên hệ',
    path: '/lien-he'
  }
]

const Nav: React.FC<{}> = ({}) => {
  const { pathname } = useLocation()
  const [currentPage, setCurrentPage] = useState<string>('/')
  const navigate = useNavigate()

  useEffect(() => {
    setCurrentPage(pathname.split('?')[0])
  }, [pathname])

  return (
    <Menu
      selectedKeys={[pathname]}
      mode='horizontal'
      className='tw-list-outside tw-list-none tw-list-image-none tw-border-none'
      overflowedIndicator={false}
      disabledOverflow={true}
    >
      {menus.map((item) => {
        const isActive = item.path === currentPage
        return (
          <Menu.Item
            key={item.key}
            className={`tw-inline-block tw-relative tw-py-[15px] tw-px-[26px]  tw-text-[13px] tw-leading-[26px] tw-font-medium hover:!tw-text-primary after:tw-border-none ${
              isActive ? 'tw-text-primary' : 'tw-text-tertiary'
            }`}
            onClick={() => navigate(item.path)}
          >
            {item.label}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

export default Nav
