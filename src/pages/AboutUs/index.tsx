import { Fragment } from 'react'
import { Breadcrumb, Col, Row, Typography, Image, Button, Card, Space, Progress } from 'antd'
import { config } from '~/utils'
const { Title, Paragraph, Text } = Typography

const AboutPage = () => {
  return (
    <Fragment>
      <header className='tw-container'>
        <Breadcrumb
          className='tw-text-sm tw-py-[41px]'
          items={[
            {
              title: 'Trang chủ',
              href: '/',
              className: 'hover:tw-text-primaryOrange'
            },
            { title: 'Giới thiệu' }
          ]}
        />
      </header>
      <div className='tw-pb-[60px]'>
        <div className='tw-container'>
          <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 12 }}>
              <div>
                <Title
                  level={1}
                  className='tw-font-medium tw-leading-[30px] tw-capitalize tw-text-tertiary tw-text-[30px] tw-mb-[19px]'
                >
                  Chào mừng đến với Panther Shop!
                </Title>
                <Paragraph className='tw-text-[15px] tw-leading-[30px] tw-mb-[22px] tw-text-secondary'>
                  Quibusdam perspiciatis pariatur magnam ducimus excepturi error libero provident animi laboriosam
                  maiores ad explicabo ea laudantium nostrum dolor distinctio, quas fugiat doloribus, sit, possimus
                  obcaecati ab quo vel commodi eum. Laudantium libero, voluptate rerum sunt hic,
                </Paragraph>
                <Paragraph className='tw-text-[15px] tw-leading-[30px] tw-mb-[22px] tw-text-secondary'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse numquam blanditiis quos, fuga,
                  aspernatur doloribus expedita, soluta dolore cumque.
                </Paragraph>
                <div>
                  <Button
                    size='large'
                    className='tw-border tw-border-solid  tw-h-10 tw-font-medium tw-inline-block tw-uppercase tw-bg-primary tw-text-white tw-border-primary'
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <Image src={`${config.publicUrl}/images/about/about1.jpg`} />
            </Col>
          </Row>
        </div>
      </div>
      <div className='tw-mb-[30px]'>
        <div className='tw-container'>
          <Row gutter={[24, 48]}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <Card
                className='tw-text-center'
                hoverable
                bodyStyle={{
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f3f3'
                }}
              >
                <Space size={[24, 0]}>
                  <Image src={`${config.publicUrl}/images/about/count.png`} alt='about-image-1' />
                  <Space direction='vertical' size={[0, 12]}>
                    <Title className='!tw-text-left !tw-mb-0' level={3}>
                      2170
                    </Title>
                    <Text>HAPPY CUSTOMERS</Text>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <Card
                className='tw-text-center'
                hoverable
                bodyStyle={{
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f3f3'
                }}
              >
                <Space size={[24, 0]}>
                  <Image src={`${config.publicUrl}/images/about/count2.png`} alt='about-image-2' />
                  <Space direction='vertical' size={[0, 12]}>
                    <Title className='!tw-text-left !tw-mb-0' level={3}>
                      8080
                    </Title>
                    <Text>AWARDS WON</Text>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <Card
                className='tw-text-center'
                hoverable
                bodyStyle={{
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f3f3'
                }}
              >
                <Space size={[24, 0]}>
                  <Image src={`${config.publicUrl}/images/about/count3.png`} alt='about-image-3' />
                  <Space direction='vertical' size={[0, 12]}>
                    <Title className='!tw-text-left !tw-mb-0' level={3}>
                      2150
                    </Title>
                    <Text>HOURS WORKED</Text>
                  </Space>
                </Space>
              </Card>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 6 }}>
              <Card
                className='tw-text-center'
                hoverable
                bodyStyle={{
                  paddingTop: '80px',
                  paddingBottom: '80px',
                  backgroundColor: '#f3f3f3'
                }}
              >
                <Space size={[24, 0]}>
                  <Image src={`${config.publicUrl}/images/about/count4.png`} alt='about-image-4' />
                  <Space direction='vertical' size={[0, 12]}>
                    <Title className='!tw-text-left !tw-mb-0' level={3}>
                      2170
                    </Title>
                    <Text>COMPLETE PROJECTS</Text>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div className='tw-pb-[60px]'>
        <div className='tw-container'>
          <Row className='tw-items-center'>
            <Col span={12} lg={{ span: 12 }}>
              <div>
                <Title level={2} className='tw-text-[25px] tw-text-tertiary tw-mb-10 tw-leading-[18px] tw-font-normal'>
                  Thông tin về chúng tôi
                </Title>
                <div className='tw-relative tw-mb-10'>
                  <Progress percent={50} size={[300, 16]} className='tw-text-primary' strokeColor='#ff6a28' />
                  <Text className='tw-absolute -tw-left-[2px] tw-bg-tertiary tw-rounded-full tw-border-[3px] tw-border-solid tw-border-primary tw-text-white tw-w-10 tw-h-10 -tw-translate-y-1/2 tw-top-1/2 tw-leading-[35px] tw-z-[9]'>
                    50%
                  </Text>
                </div>
                <div className='tw-relative tw-mb-10'>
                  <Progress percent={80} size={[300, 16]} className='tw-text-primary' strokeColor='#ff6a28' />
                  <Text className='tw-absolute -tw-left-[2px] tw-bg-tertiary tw-rounded-full tw-border-[3px] tw-border-solid tw-border-primary tw-text-white tw-w-10 tw-h-10 -tw-translate-y-1/2 tw-top-1/2 tw-leading-[35px] tw-z-[9]'>
                    80%
                  </Text>
                </div>
                <div className='tw-relative tw-mb-10'>
                  <Progress percent={90} size={[300, 16]} className='tw-text-primary' strokeColor='#ff6a28' />
                  <Text className='tw-absolute -tw-left-[2px] tw-bg-tertiary tw-rounded-full tw-border-[3px] tw-border-solid tw-border-primary tw-text-white tw-w-10 tw-h-10 -tw-translate-y-1/2 tw-top-1/2 tw-leading-[35px] tw-z-[9]'>
                    90%
                  </Text>
                </div>
                <div className='tw-relative tw-mb-10'>
                  <Progress percent={45} size={[300, 16]} className='tw-text-primary' strokeColor='#ff6a28' />
                  <Text className='tw-absolute -tw-left-[2px] tw-bg-tertiary tw-rounded-full tw-border-[3px] tw-border-solid tw-border-primary tw-text-white tw-w-10 tw-h-10 -tw-translate-y-1/2 tw-top-1/2 tw-leading-[35px] tw-z-[9]'>
                    45%
                  </Text>
                </div>
              </div>
            </Col>
            <Col span={12} lg={{ span: 12 }}>
              <Image src={`${config.publicUrl}/images/about/about2.jpg`} />
            </Col>
          </Row>
        </div>
      </div>
    </Fragment>
  )
}

export default AboutPage
