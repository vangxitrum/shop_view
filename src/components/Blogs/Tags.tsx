import { useState } from 'react'
import { Tag, Typography, Divider } from 'antd'
import { Link } from 'react-router-dom'
import { BlogTagItemType } from '~/interfaces'
const { Title } = Typography
const Tags = () => {
  const [tags, setTags] = useState<BlogTagItemType[]>([])

  return (
    <div>
      <Title level={3}>Tags</Title>
      <Divider />
      <div className='tw-flex tw-flex-wrap'>
        {tags?.map((tag: BlogTagItemType) => (
          <Tag
            key={tag.slug}
            className='tw-py-[5px] tw-px-[20px] tw-border tw-border-solid tw-border-[#ddd] tw-text-sm tw-capitalize tw-rounded-[20px] tw-mb-3'
          >
            <Link to={`/bai-viet?tag=${tag.slug}`}>{tag.name}</Link>
          </Tag>
        ))}
      </div>
    </div>
  )
}

export default Tags
