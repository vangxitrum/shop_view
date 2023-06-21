import { Button, Form, Input, message } from 'antd'
import { Fragment } from 'react'

const SubcribeForm = () => {
  const [form] = Form.useForm()
  const [messageApi, contextHolder] = message.useMessage()

  const onFinish = (values: any) => {
    console.log(values)
    messageApi.success('Đăng ký nhận tin thành công!')
    form.resetFields()
  }
  return (
    <Fragment>
      {contextHolder}
      <Form onFinish={onFinish} form={form} layout='vertical'>
        <Form.Item
          required
          name={'email'}
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập email!'
            },
            {
              type: 'email',
              message: 'Email không hợp lệ!'
            }
          ]}
        >
          <Input placeholder='example@email.com' size='large' />
        </Form.Item>
        <Form.Item>
          <Button
            block
            size='large'
            type='primary'
            htmlType='submit'
            className='tw-bg-black tw-text-white hover:tw-bg-primary'
          >
            Đăng Ký!
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  )
}
export default SubcribeForm
