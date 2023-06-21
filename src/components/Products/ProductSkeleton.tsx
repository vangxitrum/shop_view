import { Skeleton } from 'antd'
const ProductSkeleton = () => {
  return (
    <div className='tw-p-4'>
      <div className='tw-relative tw-mb-[22px]'>
        <Skeleton.Image
          active
          className='!tw-w-full tw-max-w-[100%] tw-h-auto tw-min-h-[385px] tw-flex tw-items-center tw-justify-center'
        />
      </div>
    </div>
  )
}

export default ProductSkeleton
