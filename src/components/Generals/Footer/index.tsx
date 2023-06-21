import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import SubcribeForm from './SubcribeForm'
import React from 'react'
const { Title, Text, Paragraph } = Typography

interface FooterTypes {
  isPageLayout?: boolean
}

const Footer: React.FC<FooterTypes> = ({ isPageLayout }) => {
  return (
    <footer className={`${isPageLayout ? '' : 'md:tw-px-[20px] lg:tw-px-[30px] xl:tw-px-[120px]'}`}>
      <div className='lg:tw-pb-[80px] xl:tw-pb-[92px] tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b tw-border-solid tw-border-[#ddd]'>
        <Row gutter={24}>
          <Col span={12} lg={{ span: 4 }}>
            <div>
              <Title
                level={3}
                className='tw-text-base tw-leading-[22px] tw-capitalize tw-mb-4 tw-font-semibold tw-text-tertiary tw-mt-0'
              >
                Thông tin
              </Title>
              <div>
                <ul className='tw-list-image-none tw-list-outside tw-list-none tw-p-0 tw-m-0'>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Về chúng tôi
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Thông tin giao hàng
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Điều khoản bảo mật
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Đổi trả
                    </Link>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={12} lg={{ span: 4 }}>
            <div>
              <Title
                level={3}
                className='tw-text-base tw-leading-[22px] tw-capitalize tw-mb-4 tw-font-semibold tw-text-tertiary tw-mt-0'
              >
                Thông tin thêm
              </Title>
              <div>
                <ul className='tw-list-image-none tw-list-outside tw-list-none tw-p-0 tw-m-0'>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Thương hiệu
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Quà tặng
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Đặc biệt
                    </Link>{' '}
                  </li>
                  <li>
                    <Link
                      className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                      to={'#'}
                    >
                      Specials
                    </Link>{' '}
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <div>
              <Title
                level={3}
                className='tw-text-base tw-leading-[22px] tw-capitalize tw-mb-4 tw-font-semibold tw-text-tertiary tw-mt-0'
              >
                Thông tin liên hệ
              </Title>
              <div>
                <ul className='tw-list-image-none tw-list-outside tw-list-none tw-p-0 tw-m-0'>
                  <li>
                    <Text className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'>
                      Address:Your address goes here.
                    </Text>
                  </li>
                  <li>
                    <Text className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'>
                      Phone:{' '}
                      <a
                        className='tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                        href='tel:092364524'
                      >
                        092364524
                      </a>
                    </Text>
                  </li>
                  <li>
                    <Text className='tw-block tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'>
                      Email:{' '}
                      <a
                        className='tw-font-normal tw-leading-[30px] tw-text-secondary hover:tw-text-primary'
                        href='mailto:khanh.tranhoang1999@gmail.com'
                      >
                        khanh.tranhoang1999@gmail.com
                      </a>
                    </Text>
                  </li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={12} lg={{ span: 8 }}>
            <div>
              <Title
                level={3}
                className='tw-text-base tw-leading-[22px] tw-capitalize tw-mb-4 tw-font-semibold tw-text-tertiary tw-mt-0'
              >
                Đăng ký nhận tin
              </Title>
              <div>
                <Paragraph className='tw-leading-7 tw-mb-2.5'>
                  Exceptional quality. Ethical factories. Sign up to enjoy free U.S. shipping and returns on your first
                  order.
                </Paragraph>
              </div>
              <div>
                <SubcribeForm />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className='lg:tw-py-[30px]'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={12}>
              <div>
                <Paragraph>
                  {` © 2023`}
                  <strong>{` Reid `}</strong>
                  {` Mede with ❤️`}
                </Paragraph>
              </div>
            </Col>
            <Col span={12}></Col>
          </Row>
        </div>
      </div>
    </footer>
  )
}

export default Footer
