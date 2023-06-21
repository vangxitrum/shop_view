import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faSignOut } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Avatar, MenuProps, Typography, Dropdown, Space } from 'antd'
import { Icon } from '..'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { authState, signOutAsync } from '~/redux/reducers/authSlice'

const items: MenuProps['items'] = [
  {
    label: <Link to={'/ca-nhan/thong-tin-tai-khoan'}>Thông tin tài khoản</Link>,
    key: '0'
  },
  {
    label: <Link to={'/ca-nhan/lich-su-mua-hang'}>Lịch sử đặt hàng</Link>,
    key: '2'
  },
  {
    label: <Link to={'/ca-nhan/yeu-thich'}>Sản phẩm yêu thích</Link>,
    key: '1'
  },
  {
    type: 'divider'
  },
  {
    label: 'Đăng xuất',
    icon: <FontAwesomeIcon icon={faSignOut} />,
    danger: true,
    key: 'signout'
  }
]
const AccountDropdown = () => {
  const { user } = useAppSelector(authState)
  const dispatch = useAppDispatch()
  const handleClick = (option: any) => {
    if (option.key === 'signout') {
      dispatch(signOutAsync())
    }
    return
  }

  return (
    <Dropdown menu={{ items, onClick: (option) => handleClick(option) }} trigger={['click']}>
      <a href='#' role='button' onClick={(e) => e.preventDefault()}>
        <Space size={5} className='tw-text-tertiary tw-items-center hover:tw-text-primary tw-group group-[]'>
          <Avatar size='small' src={user?.photo} alt='user image' shape='circle' icon={<Icon name='UserOutlined' />} />
          {user?.fullname}
          <FontAwesomeIcon
            icon={faChevronDown}
            className='tw-text-[#6c6c6c] tw-text-[10px] group-hover:tw-text-primary hover:tw-text-primary'
          />
        </Space>
      </a>
    </Dropdown>
  )
}

export default AccountDropdown
