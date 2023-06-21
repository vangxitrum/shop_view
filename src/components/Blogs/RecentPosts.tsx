import { useEffect, useState } from 'react'
import { List, Space, Typography, Image } from 'antd'
import moment from 'moment'
import { config } from '~/utils'
import { Link } from 'react-router-dom'
import 'moment/locale/vi'
import { RecentPostsType } from '~/interfaces'

// Use moment with Vietnamese locale
moment.locale('vi')

const { Title, Text } = Typography
const RecentPost = () => {
  const [recentPosts, setRecentPosts] = useState<RecentPostsType[]>([])

  useEffect(() => {
    setRecentPosts([])
  }, [])

  return (
    <List
      header={
        <Title className='tw-border-none' level={3}>
          Bài viết gần đây
        </Title>
      }
      dataSource={recentPosts}
      itemLayout='vertical'
      className='tw-mb-10'
      renderItem={(item: RecentPostsType) => {
        return (
          <Space className='tw-w-full' align='start' size={15}>
            <Image width={55} height={55} src={`${config.publicUrl}/images/blog/${item.thumbnail}`} />
            <Space direction='vertical' size={0}>
              <Link to={`bai-viet/${item.slug}`}>
                <Title level={5} className='!tw-mb-0 tw-text-sm !tw-text-[#747474] hover:!tw-text-primaryOrange'>
                  {item.title}
                </Title>
              </Link>
              <Text className='tw-text-xs tw-text-[#7e7e7e]'>
                {moment(JSON.parse(item.publish_date)).locale('viVN').format('DD, MMMM-YYYY') || ''}
              </Text>
            </Space>
          </Space>
        )
      }}
    />
  )
}

export default RecentPost
