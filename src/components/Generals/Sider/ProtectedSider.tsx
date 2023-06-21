import React from 'react'
import { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { Icon } from '..'
import { useLocation, useNavigate } from 'react-router-dom'

const { Sider } = Layout
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  id: number | string,
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    id,
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

const menu: MenuItem[] = []
const subMenuKeys: string[] = []

const ProtectedRoutes = {
  Infomation: {
    name: 'Thông tin Tài khoản',
    path: '/ca-nhan/thong-tin-tai-khoan',
    icon: 'SafetyOutlined',
    parentId: 0,
    id: 1
  },

  Order: {
    name: 'Lịch sử mua hàng',
    path: '/ca-nhan/lich-su-mua-hang',
    icon: 'FundOutlined',
    parentId: 0,
    id: 2
  },

  Whislist: {
    name: 'Sản phẩm yêu thích',
    path: '/ca-nhan/yeu-thich',
    icon: 'FundOutlined',
    parentId: 0,
    id: 3
  }
}

Object.values(ProtectedRoutes).forEach((route: any) => {
  let parentId = route.parentId
  let isParentExist: any = menu.find((route: any) => route.id === parentId)
  let icon = route?.icon ? <Icon name={route?.icon} /> : null
  if (isParentExist) {
    isParentExist.children = isParentExist.children
      ? [...isParentExist.children, getItem(route.id, route.name, route.path, icon)]
      : [getItem(route.id, route.name, route.path, icon)]
  } else {
    subMenuKeys.push(route.path)
    menu.push(getItem(route.id, route.name, route.path, icon))
  }

  return menu
})

const HomeSider: React.FC<{}> = ({}) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'addNewAccountType') {
    } else {
      navigate(e.key)
    }
  }

  return (
    <Sider width={`100%`} trigger={null}>
      <Menu className='custom-menu' selectedKeys={[pathname]} mode='inline' items={menu} onClick={onClick} />
    </Sider>
  )
}

export default HomeSider
