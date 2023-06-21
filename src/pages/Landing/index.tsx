import { useEffect } from 'react'
import { Banner, BestSellerProducts, BigSizeProductCarousel } from '~/components/Landing'
import { Col, Layout, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { config } from '~/utils'

const { Content } = Layout
const { Title, Paragraph } = Typography

const LandingPage = () => {
  useEffect(() => {
    document.title = 'Trang chủ - Panther Shop'
  }, [])

  return (
    <Content>
      <section className='tw-mb-[51px] lg:tw-mb-[70px] xl:tw-mb-[72px] 2xl:tw-mb-[92px] tw-px-[20px] lg:tw-px-[30px]'>
        {/* Banner 1 */}
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col lg={{ span: 16 }}>
              <div className='tw-mb-[30px]'>
                <Banner />
              </div>
            </Col>
            <Col lg={{ span: 8 }}>
              <div>
                <Row gutter={[24, 0]}>
                  <Col span={24}>
                    <div className='tw-mb-[30px]'>
                      <div className='tw-relative banner'>
                        <Link to={'/san-pham'}>
                          <img
                            src={`${config.publicUrl}/images/banner/banner4.webp`}
                            alt='#'
                            className='tw-max-w-full tw-h-auto tw-w-full'
                          />
                        </Link>
                        <div className='tw-absolute tw-top-[14%] tw-left-5'>
                          <Title
                            level={2}
                            className='tw-text-tertiary lg:tw-text-[15px] xl:tw-text-xl xl:tw-text-[28px] tw-mb-5 tw-font-medium tw-leading-none'
                          >
                            {`Men's`}
                            <br />
                            {` Summer Sneaker`}
                          </Title>
                          <Title
                            level={3}
                            className='lg:tw-text-xs xl:tw-text-base tw-text-tertiary tw-leading-[30px] tw-font-normal'
                          >
                            Tuần Siêu Giảm Giá
                          </Title>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <div className='tw-relative banner'>
                        <Link to={'/san-pham'}>
                          <img
                            src={`${config.publicUrl}/images/banner/banner5.webp`}
                            className='tw-max-w-full tw-h-auto tw-w-full'
                            alt='#'
                          />
                        </Link>
                        <div className='tw-absolute tw-top-[14%] tw-left-5'>
                          <Title
                            level={2}
                            className='tw-text-tertiary tw-text-[28px] tw-mb-5 tw-font-medium tw-leading-none'
                          >
                            Clothing.No18
                          </Title>
                          <Title level={3} className='tw-text-base tw-text-tertiary tw-leading-[30px] tw-font-normal'>
                            Giảm già 20% với tất cả cửa hàng
                          </Title>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div>
                      <div className='tw-relative banner'>
                        <Link to={'/san-pham'}>
                          <img
                            src={`${config.publicUrl}/images/banner/banner6.webp`}
                            className='tw-max-w-full tw-h-auto tw-w-full'
                            alt='#'
                          />
                        </Link>
                        <div className='tw-absolute tw-top-[14%] tw-left-5'>
                          <Title
                            level={2}
                            className='tw-text-tertiary tw-text-[28px] tw-mb-5 tw-font-medium tw-leading-none'
                          >
                            Bag.No1
                          </Title>
                          <Title level={3} className='tw-text-base tw-text-tertiary tw-leading-[30px] tw-font-normal'>
                            Siêu giảm giá
                          </Title>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className='tw-px-[20px] lg:tw-px-[30px] lg:tw-pb-[46px] xl:tw-px-[30px] xl:tw-pb-[38px] 2xl:tw-px-[120px] 2xl:tw-pb-[54px]'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={24}>
              <div className='tw-text-center tw-mb-7'>
                <Title
                  level={2}
                  className='tw-text-[36px] tw-text-tertiary tw-font-semibold tw-inline-block tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter tw-capitalize'
                >
                  Sản phẩm mới
                </Title>
                <Paragraph className='tw-mb-0'>
                  Mẫu sản phẩm mới nhất, hiện đại nhất vừa cập bến cửa hàng của chúng tôi
                </Paragraph>
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <BigSizeProductCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className='tw-mb-[51px] lg:tw-mb-[71px] tw-px-[20px] lg:tw-px-[30px]'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={24}>
              <div>
                <div className='tw-relative banner'>
                  <Link to={'/san-pham'}>
                    <img
                      src={`${config.publicUrl}/images/banner/banner7.webp`}
                      className='tw-max-w-full tw-h-auto tw-w-full'
                      alt='#'
                    />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className='lg:tw-mb-8 xl:tw-mb-[46px] tw-px-[20px] lg:tw-px-[30px] xl:tw-px-[30px] xl:tw-pb-[31px] 2xl:tw-px-[120px] 2xl:tw-pb-[46px]'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={24}>
              <div className='tw-text-center tw-mb-7'>
                <Title
                  level={2}
                  className='tw-text-[36px] tw-text-tertiary tw-font-semibold tw-inline-block tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter tw-capitalize'
                >
                  Sản phẩm thịnh hành
                </Title>
                <Paragraph className='tw-mb-0'>Sản phẩm ấn tượng và bán chạy nhất</Paragraph>
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <BestSellerProducts />
            </div>
          </div>
        </div>
      </section>

      {/* <section className='lg:tw-mb-0 tw-mb-[46px] tw-px-[20px] lg:tw-px-[30px] xl:tw-px-[30px] 2xl:tw-px-[120px] lg:tw-pb-[75px] xl:tw-pb-[94px]'>
        <div className='tw-container-fluid'>
          <Row gutter={24}>
            <Col span={24}>
              <div className='tw-text-center tw-mb-7'>
                <Title
                  level={2}
                  className='tw-text-[36px] tw-text-tertiary tw-font-semibold tw-inline-block tw-mb-[11px] tw-leading-[38px] tw-tracking-tighter tw-capitalize'
                >
                  Bài viết mới nhất
                </Title>
                <Paragraph className='tw-mb-0'>Cập nhật xu thế thời trang</Paragraph>
              </div>
            </Col>
          </Row>
          <div className='xl:tw-pb-[94px] tw-border-t-0 tw-border-l-0 tw-border-r-0 tw-border-b tw-border-solid tw-border-[#ddd]'>
            <div>
              <NewestBlog />
            </div>
          </div>
        </div>
      </section> */}
    </Content>
  )
}

export default LandingPage
