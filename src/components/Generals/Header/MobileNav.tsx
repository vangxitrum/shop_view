import { Drawer, Image, Space } from 'antd'
import { Menu } from 'antd'
import type { MenuProps } from 'antd'
import { Icon } from '..'
import { useLocation, useNavigate } from 'react-router-dom'
import { config } from '~/utils'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { appState, toggleMobileSiderVisible } from '~/redux/reducers/appSlice'
type MenuItem = Required<MenuProps>['items'][number]

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
  {
    key: '/bai-viet',
    label: 'Tin tức',
    path: '/bai-viet'
  },
  {
    key: '/ve-chung-toi',
    label: 'Về chúng tôi',
    path: '/ve-chung-toi'
  },
  {
    key: '/lien-he',
    label: 'Liên hệ',
    path: '/lien-he'
  }
]

function getItem(
  id: number,
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

Object.values(menus).forEach((route: any) => {
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

const MobileSider = () => {
  const { isMobile, mobileNavVisible } = useAppSelector(appState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { pathname } = useLocation()
  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }
  if (!isMobile) return null

  return (
    <Drawer
      open={mobileNavVisible}
      placement='left'
      onClose={() => dispatch(toggleMobileSiderVisible(!mobileNavVisible))}
      key='mobile-sider-left'
      closable={false}
      bodyStyle={{ padding: 0 }}
      size={'default'}
    >
      <Space className='tw-p-4 tw-justify-center tw-w-full' align='center'>
        <Image width={50} src={`${config.publicUrl}/image/logo/logo.png`} alt='logo' />
      </Space>
      <Menu
        defaultSelectedKeys={[pathname]}
        // openKeys={openKeys}
        // onOpenChange={onOpenChange}
        mode='inline'
        theme='light'
        items={menu}
        onClick={onClick}
      />
    </Drawer>
  )
}

export default MobileSider
