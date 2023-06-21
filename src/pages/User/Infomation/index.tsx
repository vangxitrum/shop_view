import { useEffect, useState } from 'react'
import { Col, Row, Typography, Input, Button, Avatar, Upload, message } from 'antd'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
import { AddressTable, InfomationForm } from '~/components/User/Infomation'
import { Icon } from '~/components/Generals'
import { AddressForm } from '~/components/Checkout'
import type { UploadChangeParam } from 'antd/es/upload'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import { getBase64 } from '~/utils'
import { createUserAddress, getUserAddress, userState } from '~/redux/reducers/userSlice'
import { User, UserAddress } from '~/interfaces'

const { Title, Paragraph, Text } = Typography
const Infomation = () => {
  const { user } = useAppSelector(authState)
  const [formVisible, toggleFormVisible] = useState(false)
  const [addressListVisible, toggleAddressListVisible] = useState(false)
  const [addressFormVisible, toggleAddressFormVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()
  const { address } = useAppSelector(userState)
  const [editingAddress, setEditingAddress] = useState<UserAddress>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.title = 'Thông tin tài khoản'
    if (!address.length) {
      dispatch(getUserAddress())
    }
  }, [])

  const handleBeforeUploadAvatar = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('Chỉ có thể sử dụng file có đuôi JPG/PNG!')
    }

    const isLt2M = file.size / 1024 / 1024 < 1
    if (!isLt2M) {
      message.error('Hình ảnh phải nhỏ hơn 1MB!')
    }

    return isJpgOrPng
  }

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done' || info.file.status === 'error') {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false)
        setImageUrl(url)
      })
    }
  }

  const handleCreateAddress = (params: any) => {
    dispatch(createUserAddress(params))
  }

  // const handleUploadAvatar = ({ file }) => {}

  return (
    <section className='tw-relative tw-p-6 tw-min-h-full tw-h-full tw-flex tw-flex-col'>
      <Row gutter={24} className='tw-mb-8'>
        <Col span={24}>
          <Title level={3} className='tw-mb-0 tw-font-semibold'>
            Hồ sơ tài khoản
          </Title>
        </Col>
        <Col span={24}>
          <Text>Quản lý thông tin hồ sơ</Text>
        </Col>
      </Row>

      <Row gutter={24} className='tw-mb-6'>
        <Col span={16}>
          <Row gutter={[24, 24]} className='tw-mb-6'>
            <Col span={24} md={{ span: 5 }}>
              <Title level={5} className='tw-m-0 tw-text-right'>
                Họ tên
              </Title>
            </Col>
            <Col span={24} md={{ span: 19 }}>
              <Input defaultValue={user?.fullname} disabled={true} />
            </Col>
          </Row>

          <Row gutter={24} className='tw-mb-6'>
            <Col span={24} md={{ span: 5 }}>
              <Title level={5} className='tw-m-0 tw-text-right'>
                Số điện thoại
              </Title>
            </Col>
            <Col span={24} md={{ span: 19 }}>
              <Input defaultValue={user?.phoneNumber} disabled={true} />
            </Col>
          </Row>

          <Row gutter={24} className='tw-mb-6'>
            <Col span={24} md={{ span: 5 }}>
              <Title level={5} className='tw-m-0 tw-text-right'>
                Địa chỉ Email
              </Title>
            </Col>
            <Col span={24} md={{ span: 19 }}>
              <Input defaultValue={user?.email} disabled={true} />
            </Col>
          </Row>

          <Row gutter={24} className='tw-mb-6'>
            <Col span={24} md={{ span: 5 }}>
              <Title level={5} className='tw-m-0 tw-text-right'>
                Địa chỉ
              </Title>
            </Col>
            <Col span={24} md={{ span: 19 }}>
              <Input defaultValue={user?.address} disabled={true} />
            </Col>
          </Row>
        </Col>

        <Col
          span={8}
          className=' before:tw-content-[""] before:tw-absolute before:tw-top-1/2 before:tw-left-10 before:-tw-translate-y-1/2 before:tw-bg-slate-400 before:tw-h-4/5 before:tw-w-[1px]'
        >
          <div className='tw-flex tw-flex-col tw-items-center tw-justify-between'>
            <Avatar
              size={100}
              alt='user-avatar'
              className='tw-rounded-full'
              src={user?.photo || imageUrl}
              icon={<Icon name='UserOutlined' />}
            />

            <Upload
              showUploadList={false}
              name='avatar'
              listType='picture'
              beforeUpload={handleBeforeUploadAvatar}
              onChange={handleChange}
              // customRequest={handleUploadAvatar}
            >
              <Button loading={loading} disabled={loading} className='tw-mt-4 tw-min-w-[100px]'>
                Chọn ảnh
              </Button>
            </Upload>

            <Paragraph className='tw-mt-4 tw-text-center tw-w-2/3'>
              Dụng lượng file tối đa 1 MB.
              <br />
              Định dạng: .JPEG, .PNG
            </Paragraph>
          </div>
        </Col>
      </Row>
      <div className='tw-absolute tw-right-[24px] tw-bottom-[24px]'>
        <Button onClick={() => toggleAddressListVisible(true)} className='tw-mr-4 tw-font-semibold'>
          Chỉnh sửa địa chỉ
        </Button>
        <Button className='tw-bg-primary tw-text-white tw-font-semibold' onClick={() => toggleFormVisible(true)}>
          Chỉnh sửa thông tin
        </Button>
      </div>

      <div
        className={`tw-absolute ${
          addressListVisible ? 'tw-left-0 tw-opacity-100' : 'tw-left-full tw-opacity-0'
        } tw-transition-all tw-duration-300 tw-top-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-p-6 tw-z-10 tw-bg-white`}
      >
        <div className='tw-w-full tw-flex tw-items-center tw-justify-between tw-mb-3'>
          <Title level={3}>
            <Icon name='LeftOutlined' className='tw-cursor-pointer' onClick={() => toggleAddressListVisible(false)} />
            Danh sách địa chỉ
          </Title>
          <Button onClick={() => toggleAddressFormVisible(true)}>Thêm mới</Button>
        </div>
        <div className='tw-flex-1'>
          <AddressTable
            data={address}
            onModifyAddress={(address: UserAddress) => {
              setEditingAddress(address)
              toggleAddressFormVisible(true)
            }}
          />
        </div>
      </div>
      <InfomationForm visible={formVisible} onClose={() => toggleFormVisible(false)} />
      <AddressForm data={editingAddress} open={addressFormVisible} onClose={() => toggleAddressFormVisible(false)} />
    </section>
  )
}

export default Infomation
