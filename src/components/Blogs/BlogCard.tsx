import React from 'react'
import moment from 'moment'
import { Image } from 'antd'
import { config } from '~/utils'
import { Link } from 'react-router-dom'
import { BlogItemType } from '~/interfaces'
const NewsCard: React.FC<BlogItemType> = ({ title, author, thumbnail, slug, publish_date, excerpt }) => {
  return (
    <div className='tw-p-4'>
      <div className='tw-relative tw-mb-[22px]'>
        <div>
          <Image src={`${config.publicUrl}/images/blog/${thumbnail}`} alt='' preview={false} />
        </div>
      </div>
      <div>
        <Link
          to={`/bai-viet/${slug}`}
          className='tw-text-base tw-capitalize tw-leading-[18px] tw-relative tw-mt-0 tw-mb-[14px] tw-font-semibold'
        >
          {title}
        </Link>
        <div className='tw-mb-[11px]'>
          <p className='tw-text-[13px] tw-capitalize tw-text-[#747474] last:tw-mb-0'>
            <span className='tw-text-[#242424] tw-text-[13px]'>Tác giả{` `}</span>
            <span className='tw-text-[#ff6a28] tw-text-[13px]'>
              {author}
              {` `}
            </span>
            {moment(JSON.parse(publish_date)).format('DD-MM-yyyy')}
          </p>
        </div>
        <div>
          <p className='tw-leading-[22px] tw-line-clamp-3'>{excerpt}</p>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
