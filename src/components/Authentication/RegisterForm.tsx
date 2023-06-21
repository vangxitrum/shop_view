import { Button, Form, Input } from 'antd'
import { Icon } from '../Generals'
import { signinAsync } from '../../redux/reducers/authSlice'

const RegisterForm: React.FC<{}> = ({}) => {
  const [form] = Form.useForm()

  const onFinish = (values: any) => {
    signinAsync(values)
  }

  return (
    <Form layout='vertical' form={form} onFinish={onFinish}>
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Please input your username!'
          }
        ]}
      >
        <Input
          prefix={<Icon name='UserOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Username'
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          },
          {
            required: true,
            message: 'Please input your E-mail!'
          }
        ]}
      >
        <Input
          prefix={<Icon name='MailOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='abc@gmail ...'
          size='large'
        />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
        <Input.Password
          autoComplete='false'
          prefix={<Icon name='LockOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Password'
          size='large'
        />
      </Form.Item>
      <Form.Item
        name='confirm'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu'
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('Mật khẩu không trùng khớp!!'))
            }
          })
        ]}
      >
        <Input.Password
          autoComplete='false'
          prefix={<Icon name='LockOutlined' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Confirm Password'
          size='large'
        />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit' className='tw-font-semibold' size='large' block>
          Tạo Tài Khoản
        </Button>
      </Form.Item>
    </Form>
  )
}
export default RegisterForm
