import { Col, Row, Typography, Image } from 'antd'
import { useEffect, useState } from 'react'
import { config } from '~/utils'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { RecentPostsType } from '~/interfaces'
const { Title, Text } = Typography
const RelativeBlogs = () => {
  const [relativePosts, setRelativePosts] = useState<RecentPostsType[]>([])

  useEffect(() => {
    setRelativePosts([])
  }, [])
  return (
    <div className='related_posts'>
      <Title className='tw-border-none' level={3}>
        Bài viết liên quan
      </Title>
      <Row gutter={[24, 24]}>
        {relativePosts.map((post: RecentPostsType, index) => (
          <Col span={12} lg={{ span: 8 }} key={`relative-${index}-post`}>
            <div className='single_related_posts'>
              <div className='related_posts_thumb'>
                <Image width={'100%'} src={`${config.publicUrl}/images/blog/${post.thumbnail}`} />
              </div>
              <div className='related_posts_content'>
                <Link to={`bai-viet/${post.slug}`}>
                  <Title level={5} className='!tw-mb-0 tw-text-sm !tw-text-[#747474] hover:!tw-text-primaryOrange'>
                    {post.title}
                  </Title>
                </Link>
                <Text className='tw-text-xs tw-text-[#7e7e7e]'>
                  {moment(JSON.parse(post.publish_date)).locale('viVN').format('DD, MMMM-YYYY') || ''}
                </Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default RelativeBlogs
