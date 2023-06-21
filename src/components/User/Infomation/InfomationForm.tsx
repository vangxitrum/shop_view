import { Form, Input, Modal, Typography } from 'antd'
import { useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
const { Title } = Typography

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
}

const InfomationForm = ({ visible, onClose }: { visible: boolean; onClose: Function }) => {
  const { user } = useAppSelector(authState)
  const [form] = Form.useForm()
  return (
    <Modal open={visible} onCancel={() => onClose()} title={<Title level={3}>Chỉnh sửa thông tin tài khoản</Title>}>
      <Form
        form={form}
        className='tw-block tw-w-full tw-mx-auto tw-py-3'
        initialValues={{
          fullname: user?.fullname
        }}
      >
        <Form.Item
          {...formItemLayout}
          name='fullname'
          label={
            <Title level={5} className='tw-m-0'>
              Họ tên:{' '}
            </Title>
          }
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input placeholder='Trần Văn A' />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name='phone'
          label={
            <Title level={5} className='tw-m-0'>
              Số điện thoại:{' '}
            </Title>
          }
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input placeholder='0123456789' />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name='email'
          label={
            <Title level={5} className='tw-m-0'>
              Email:{' '}
            </Title>
          }
          rules={[
            { required: true, message: 'Vui lòng nhập địa chỉ email' },
            { type: 'email', message: 'Địa chỉ email không hợp lệ' }
          ]}
        >
          <Input placeholder='example@email' />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default InfomationForm
