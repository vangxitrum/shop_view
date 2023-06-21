import { Typography } from 'antd'
import { useTypes } from '~/hooks/Products/useTypes'

const { Title, Text } = Typography

const Types = ({ selected, onChange }: { selected: string[]; onChange: Function }) => {
  const { data: types } = useTypes()

  return (
    <div className='xl:tw-mb-[45px]'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Loại sản phẩm
      </Title>
      <ul className='tw-list-outside tw-list-none tw-list-image-none tw-m-0 tw-p-0'>
        {types?.map((type: any) => {
          const isActive = selected?.includes(type)
          return (
            <li
              className='tw-mb-2 tw-cursor-pointer group-[] tw-group'
              key={type}
              onClick={() => {
                if (isActive) {
                  onChange(selected.filter((item: string) => item !== type))
                } else {
                  onChange(selected ? [...selected, type] : [type])
                }
              }}
            >
              <Text
                className={`tw-block tw-leading-[27px] tw-duration-300 hover:tw-text-primary ${
                  isActive ? 'tw-text-primary tw-font-semibold' : 'tw-text-tertiary'
                }`}
              >
                {type}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Types
