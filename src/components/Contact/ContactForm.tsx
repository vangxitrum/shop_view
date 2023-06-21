import { Button, Form, Input, Modal, Result } from 'antd'
import { useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
const { TextArea } = Input
const ContactForm = () => {
  const [form] = Form.useForm()
  const [successModalVisible, toggleSuccessModalVisible] = useState(false)
  const navigate = useNavigate()
  const onSubmit = (values: any) => {
    console.log('values', values)
    toggleSuccessModalVisible(true)
    form.resetFields()
  }
  return (
    <div>
      <Form form={form} layout='vertical' onFinish={onSubmit}>
        <Form.Item
          required
          label='Họ tên'
          name={'fullname'}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập tên'
            }
          ]}
        >
          <Input placeholder='Trần Văn A ...' />
        </Form.Item>
        <Form.Item
          name={'email'}
          required
          label='Địa chỉ email'
          rules={[{ type: 'email', required: true, message: 'Vui lòng nhập địa chỉ email' }]}
        >
          <Input placeholder='abc@gmail.com...' />
        </Form.Item>
        <Form.Item
          required
          label='Chủ đề'
          name={'title'}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập chủ đề'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label='Nội dung' name={'content'}>
          <TextArea rows={4} placeholder='Lời nhắn ...' />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16 }}>
          <Button
            size='large'
            type='primary'
            htmlType='submit'
            className='tw-bg-primary tw-font-semibold tw-min-w-[140px] hover:!tw-bg-black'
          >
            Gửi
          </Button>
        </Form.Item>
      </Form>
      <Modal open={successModalVisible} footer={false} onCancel={() => toggleSuccessModalVisible(false)}>
        <Result
          status='success'
          title='Thành công!'
          subTitle='Chúng tôi xin phép ghi nhận phản hổi của bạn và sẽ liên hệ lại trong thời gian gần nhất.'
          extra={[
            <Button className='tw-bg-primary tw-text-white' onClick={() => navigate('/')}>
              Về trang chủ
            </Button>
          ]}
        />
      </Modal>
    </div>
  )
}

export default ContactForm
