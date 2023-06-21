import { config } from '~/utils'
import { Link } from 'react-router-dom'
import { List, Space, Image, Typography, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { BlogItemType } from '~/interfaces'

const { Title, Text } = Typography
const BlogList = () => {
  const [blogList, setBlogList] = useState<BlogItemType[]>([])
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    setBlogList([])
  }, [page])
  return (
    <List
      header={false}
      dataSource={blogList}
      itemLayout='vertical'
      footer={
        <Pagination
          className='tw-text-center'
          current={page}
          total={blogList.length}
          onChange={(page: number) => setPage(page)}
        />
      }
      renderItem={(item: BlogItemType) => {
        return (
          <div key={item.key} className='tw-mb-12'>
            <div className='tw-flex'>
              <div className='tw-w-2/5'>
                <Image src={`${config.publicUrl}/images/blog/${item.thumbnail}`} />
              </div>
              <div className='tw-w-3/5 tw-pl-10'>
                <Space direction='vertical' size={[12, 8]}>
                  <Space align='end'>
                    <Title level={2} className='!tw-inline !tw-text-[#a9a9a9] !tw-text-5xl !tw-leading-10'>
                      {moment(JSON.parse(item.publish_date)).format('MM')}
                    </Title>
                    <Text className='!tw-text-[#a9a9a9] tw-text-sm'>
                      {'/ '}
                      {moment(JSON.parse(item.publish_date)).format('MMMM')}
                    </Text>
                  </Space>
                  <Title level={4} className='!tw-text-[#242424] !tw-text-xl !tw-mb-0 hover:!tw-text-primaryOrange'>
                    <Link
                      className='!tw-text-[#242424] !tw-text-xl !tw-mb-0 hover:!tw-text-primaryOrange'
                      to={`bai-viet/${item.slug}`}
                    >
                      {item.title}
                    </Link>
                  </Title>
                  <Text className='tw-line-clamp-4'>{item.excerpt}</Text>
                  <Link to={`bai-viet/${item.slug}`} className='tw-underline hover:!tw-text-primaryOrange'>
                    Đọc thêm
                  </Link>
                  <Text>
                    Đăng bởi {item.author} / {item.category}
                  </Text>
                </Space>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default BlogList
