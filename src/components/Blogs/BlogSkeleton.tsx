import { Skeleton } from 'antd'
const BlogSkeleton = () => {
  return (
    <div className='tw-p-4'>
      <div className='tw-relative tw-mb-[22px]'>
        <Skeleton.Image active className='!tw-w-full' />
      </div>
      <div>
        <Skeleton active />
      </div>
    </div>
  )
}

export default BlogSkeleton
