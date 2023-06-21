import { Button, Table, Tag } from 'antd'
import { withTableSize } from '~/hocs'
import type { ColumnsType } from 'antd/es/table'
import { format3P } from '~/utils'
import moment from 'moment'
import { Icon } from '~/components/Generals'

const OrderTable = (props: any) => {
  const { parrentSize, data, loading } = props

  const columns: ColumnsType<any> = [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'date',
      key: 'date',
      render(_value, _record, _index) {
        return moment(_record?.payment_info?.created_at).isValid()
          ? moment(_record?.payment_info?.created_at).format('DD/MM/YYYY')
          : '--'
      }
    },
    {
      title: 'Tình trạng',
      dataIndex: 'status',
      key: 'status',
      render(value, _record, _index) {
        if (value === 'PENDING') {
          return (
            <Tag color='warning' className='tw-text-sm' icon={<Icon name='SyncOutlined' spin />}>
              Đang xử lý
            </Tag>
          )
        }
        if (value === 'CANCEL') {
          return (
            <Tag color='error' className='tw-text-sm' icon={<Icon name='ExclamationCircleOutlined' />}>
              Đã huỷ
            </Tag>
          )
        }
        return (
          <Tag color='success' className='tw-text-sm' icon={<Icon name='CheckCircleOutlined' />}>
            Đã thanh toán
          </Tag>
        )
      }
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'total',
      key: 'total',
      render(value: any) {
        return format3P(value) + 'đ'
      }
    },
    {
      title: '',
      key: 'detail',
      width: 120,
      render(_value, record, _index) {
        return (
          <Button className='tw-bg-primary tw-text-white' onClick={() => props.showDetail(record.id)}>
            Chi tiết
          </Button>
        )
      }
    }
  ]
  return (
    <Table
      loading={loading}
      columns={columns}
      className={`tw-min-h-full tw-h-[${parrentSize?.height}px]`}
      scroll={{ y: parrentSize?.height }}
      dataSource={data}
      pagination={{
        pageSize: 5,
        total: data?.length || 0
      }}
    />
  )
}

export default withTableSize(OrderTable)
