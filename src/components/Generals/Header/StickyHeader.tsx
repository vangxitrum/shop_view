import { Col, Row } from 'antd'
import { Nav } from '.'
const StickyHeader = ({ visible }: { visible: boolean }) => {
  if (!visible) return null
  return (
    <div className='tw-block tw-fixed tw-top-0 tw-left-0 tw-w-full tw-z-[9] tw-bg-[rgba(255,255,255,0.95)] tw-animate-fadeInDown tw-shadow-stickyHeader'>
      <div className='tw-container'>
        <Row className='tw-items-center'>
          <Col span={24}>
            <div className='tw-text-center'>
              <div>
                <Nav />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default StickyHeader
