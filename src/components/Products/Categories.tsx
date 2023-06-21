import { Typography } from 'antd'

const categories = [
  {
    id: 99,
    name: 'Tất cả',
    value: '',
    count: 60
  },
  {
    id: 1,
    name: 'Phụ nữ',
    value: 'WOMEN',
    count: 10
  },
  {
    id: 2,
    name: 'Đàn ông',
    value: 'MEN',
    count: 20
  },
  {
    id: 3,
    name: 'Trẻ em',
    value: 'KID',
    count: 30
  }
]
const { Title, Text } = Typography

const Categories = ({ selected, onChange }: { selected: string; onChange: Function }) => {
  return (
    <div className='xl:tw-mb-[45px]'>
      <Title
        level={2}
        className='tw-text-tertiary tw-text-lg tw-mb-[15px] tw-pb-[5px] tw-capitalize tw-font-semibold tw-leading-6'
      >
        Danh mục sản phẩm
      </Title>
      <ul className='tw-list-outside tw-list-none tw-list-image-none tw-m-0 tw-p-0'>
        {categories?.map((category) => {
          const isActive = selected === category.value
          return (
            <li
              className='tw-mb-2 tw-cursor-pointer group-[] tw-group'
              key={category.id}
              onClick={() => {
                onChange(category.value)
              }}
            >
              <Text
                className={`tw-block tw-leading-[27px] transi tw-duration-300 hover:tw-text-primary ${
                  isActive ? 'tw-text-primary tw-font-semibold' : 'tw-text-tertiary'
                }`}
              >
                {category.name}
              </Text>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Categories
