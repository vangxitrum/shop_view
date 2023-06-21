import { useEffect, useState } from 'react'
import { List, Typography } from 'antd'

const { Title } = Typography
const Categories = () => {
  const [categories, setCartegories] = useState<any>([])
  useEffect(() => {
    setCartegories([])
  }, [])
  return (
    <List
      header={<Title level={3}>Danh mục</Title>}
      footer={false}
      className='tw-mb-10'
      bordered
      dataSource={categories}
      renderItem={(item: any) => {
        return (
          <List.Item>
            <span className='hover:tw-text-primaryOrange'>{item?.key}</span>
            <span>
              {` `}
              {`(${item?.value})`}
            </span>
          </List.Item>
        )
      }}
    />
  )
}

export default Categories
