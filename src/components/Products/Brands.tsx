import { Typography } from 'antd'
import { useBrands } from '~/hooks/Products/useBrands'

const { Title, Text } = Typography

const Brands = ({ selected, onChange }: { selected: string[]; onChange: Function }) => {
  const { data: brands } = useBrands()

  return (
    <div className='xl:tw-mb-[45px]'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Thương hiệu
      </Title>
      <ul className='tw-list-outside tw-list-none tw-list-image-none tw-m-0 tw-p-0'>
        {brands?.map((brand: any) => {
          const isActive = selected?.includes(brand)
          return (
            <li
              className='tw-mb-2 tw-cursor-pointer group-[] tw-group'
              key={brand}
              onClick={() => {
                if (isActive) {
                  onChange(selected.filter((item: string) => item !== brand))
                } else {
                  onChange(selected ? [...selected, brand] : [brand])
                }
              }}
            >
              <Text
                className={`tw-block tw-leading-[27px] tw-duration-300 hover:tw-text-primary ${
                  isActive ? 'tw-text-primary tw-font-semibold' : 'tw-text-tertiary'
                }`}
              >
                {brand}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Brands
