import { Button, Form, Input } from 'antd'
import { Icon } from '../Generals'
import { authState, signinAsync } from '../../redux/reducers/authSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

const SignInForm: React.FC<{}> = ({}) => {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const { status } = useAppSelector(authState)
  const onFinish = (values: any) => {
    dispatch(signinAsync(values))
  }

  return (
    <Form layout='vertical' form={form} onFinish={onFinish}>
      <Form.Item
        name='username'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập tên đăng nhập!'
          }
        ]}
      >
        <Input
          prefix={<Icon name='UserOutlined' className='site-form-item-icon' />}
          size='large'
          placeholder='Username'
          autoComplete='username'
        />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          {
            required: true,
            message: 'Vui lòng nhập mật khẩu!'
          }
        ]}
      >
        <Input.Password
          prefix={<Icon name='LockOutlined' className='site-form-item-icon' />}
          size='large'
          placeholder='Password'
          autoComplete='current-password'
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={status === 'loading'}
          type='primary'
          htmlType='submit'
          className='tw-font-semibold'
          size='large'
          block
        >
          Đăng Nhập
        </Button>
      </Form.Item>
    </Form>
  )
}
export default SignInForm
