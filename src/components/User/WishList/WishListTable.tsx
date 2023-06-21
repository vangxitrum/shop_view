import { Button, Image, Popconfirm, Space, Table, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { removeItemFromWishlistAsync, userState } from '~/redux/reducers/userSlice'
import { WishlistItem } from '~/interfaces'
const { Text } = Typography
const WishListTable = (props: any) => {
  const { parrentSize } = props
  const { wishlist } = useAppSelector(userState)
  const dispatch = useAppDispatch()

  const [data, setData] = useState<WishlistItem[]>([])

  useEffect(() => {
    if (wishlist) {
      setData(wishlist)
    }
  }, [wishlist])

  const columns: ColumnsType<any> = [
    {
      title: '#',
      width: 60,
      render(_value, _record, index) {
        return `${index + 1}`
      }
    },
    {
      title: 'Sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render(_value, _record, _index) {
        return (
          <Space>
            <Image width={85} height={100} placeholder />
            <Text>Sản phẩm bla bla</Text>
          </Space>
        )
      }
    },
    {
      title: '#',
      dataIndex: 'address',
      key: 'address',
      width: 120,
      align: 'center',
      render(_value, record, _index) {
        return (
          <Popconfirm
            title='Bỏ thích sản phẩm'
            description='Bạn chắc chắn muốn bỏ thích sản phẩm này?'
            onConfirm={() => {
              dispatch(removeItemFromWishlistAsync([record.id]))
            }}
            okButtonProps={{ className: 'tw-bg-red-500', danger: true }}
            cancelButtonProps={{ className: 'hover:tw-border-primary hover:tw-text-primary' }}
          >
            <Button className='tw-bg-primary tw-text-white'>Bỏ thích</Button>
          </Popconfirm>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={data?.map((item) => ({
        ...item,
        key: item.id
      }))}
      className={`tw-min-h-full tw-h-[${parrentSize?.height}px]`}
      scroll={{ y: parrentSize?.height }}
    />
  )
}

export default withTableSize(WishListTable)
