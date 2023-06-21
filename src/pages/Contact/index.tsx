import { ReactElement } from 'react'
import { Breadcrumb, Col, Divider, Row, Typography, Image, Button, Card, Space } from 'antd'
import { ContactForm } from '~/components/Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFax, faPhone, faSquareEnvelope } from '@fortawesome/free-solid-svg-icons'
const { Title, Paragraph, Text } = Typography
const About = () => {
  return (
    <section className='tw-container tw-pb-9'>
      <Breadcrumb
        className='tw-text-sm tw-py-11'
        items={[
          {
            title: 'Trang chủ',
            href: '/',
            className: 'hover:tw-text-primaryOrange'
          },
          { title: 'Liên hệ' }
        ]}
      />
      <div className='container'>
        <Row gutter={[24, 48]}>
          <Col span={24} lg={{ span: 12 }}>
            <Title level={1}>Liên hệ với chúng tôi!</Title>
            <Paragraph className='tw-text-[15px] tw-leading-5 tw-text-[#747474]'>
              Claritas est etiam processus dynamicus, qui sequitur mutationem consuetudium lectorum. Mirum est notare
              quam littera gothica, quam nunc putamus parum claram anteposuerit litterarum formas human. qui sequitur
              mutationem consuetudium lectorum. Mirum est notare quam
            </Paragraph>
            <Divider />
            <Text>
              <FontAwesomeIcon icon={faFax} className='tw-mr-4' />
              Địa chỉ: SME+ Khu CNPM
            </Text>
            <Divider />
            <FontAwesomeIcon icon={faSquareEnvelope} className='tw-mr-4' />
            smep.khanhth@gmail.com
            <Divider />
            <FontAwesomeIcon icon={faPhone} className='tw-mr-4' />
            (+84)902364524
          </Col>
          <Col span={24} lg={{ span: 12 }}>
            <ContactForm />
          </Col>
        </Row>
      </div>
      <div className='contact_map'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='map-area'>
                <div id='googleMap'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </section>
  )
}

export default About
