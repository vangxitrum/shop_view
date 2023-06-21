import { Dropdown, Space, Table, Modal } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'
import { Icon } from '~/components/Generals'
import type { MenuProps } from 'antd'
import { MenuInfo } from 'rc-menu/lib/interface'
import { UserAddress } from '~/interfaces'
import { useAppDispatch } from '~/redux/hooks'
import { deleteUserAddress } from '~/redux/reducers/userSlice'
const { confirm } = Modal

const AddressTable = (props: any) => {
  const { parrentSize, data, onModifyAddress } = props
  const dispatch = useAppDispatch()

  const items: MenuProps['items'] = [
    {
      label: 'Chỉnh sửa',
      key: 'modify'
    },
    {
      label: 'Xoá',
      key: 'delete',
      danger: true
    }
  ]

  const handleClick = (props: MenuInfo, item: UserAddress) => {
    switch (props.key) {
      case 'modify':
        onModifyAddress(item)
        break
      case 'delete':
        confirm({
          title: 'DBạn chắc chắn muốn xoá địa chỉ này?',
          icon: <Icon name='ExclamationCircleFilled' />,
          content: 'Some descriptions',
          onOk() {
            dispatch(deleteUserAddress(item?.id))
          }
        })
        break
      default:
        return
    }
  }

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name',
      width: 60,
      align: 'center',
      render(_value, _record, index) {
        return <span>{index + 1}</span>
      }
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '#',
      dataIndex: 'age',
      key: 'age',
      width: 60,
      render(_value, _record) {
        return (
          <Dropdown menu={{ items, onClick: (props: MenuInfo) => handleClick(props, _record) }} trigger={['click']}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Icon name='BarsOutlined' />
              </Space>
            </a>
          </Dropdown>
        )
      }
    }
  ]

  return (
    <Table
      pagination={{
        pageSize: 7
      }}
      dataSource={data.map((item: any) => ({
        key: item.id,
        ...item
      }))}
      columns={columns}
      scroll={{ y: parrentSize?.height }}
    />
  )
}

export default withTableSize(AddressTable)
