import { useEffect, useState } from 'react'
import { Space, Typography, Button, Radio, Modal, Divider } from 'antd'
import type { RadioChangeEvent } from 'antd'

import { PlusCircleFilled } from '@ant-design/icons'
import AddressForm from './AddressForm'
const { Text } = Typography

const AddressSelector = ({
  addressModalVisibility,
  address,
  onCloseModal,
  onConfirm,
  currentAddress
}: {
  addressModalVisibility: boolean
  address: any[]
  currentAddress: any
  onCloseModal: Function
  onConfirm: Function
}) => {
  const [selectedAddress, setSelectedAddress] = useState<number>(1)
  const [addFormVisiblity, setAddFormVisiblity] = useState<boolean>(false)

  useEffect(() => {
    if (currentAddress && address.length) {
      setSelectedAddress(address.find((address) => address.id === currentAddress.id)?.id as number)
    }
  }, [currentAddress, address])

  return (
    <>
      <Modal
        title='Địa chỉ của tôi'
        bodyStyle={{
          borderTop: '1px solid black'
        }}
        open={addressModalVisibility}
        onOk={() => {
          onConfirm(selectedAddress)
        }}
        onCancel={() => onCloseModal()}
        okText='Xác nhận'
        cancelText='Huỷ'
        okButtonProps={{
          className: 'tw-bg-primary hover:!tw-bg-primary'
        }}
        cancelButtonProps={{
          className: 'hover:!tw-border-primary hover:!tw-text-primary'
        }}
      >
        <div className='tw-py-4'>
          <Radio.Group
            value={selectedAddress}
            onChange={(e: RadioChangeEvent) => {
              setSelectedAddress(e.target.value)
            }}
          >
            {address?.map((address) => {
              return (
                <Radio value={address.id} key={`option-address-${address.id}`} className='!tw-text-primary'>
                  <Space direction='vertical' size={[2, 4]}>
                    <Text>{address?.address || address?.status}</Text>
                  </Space>
                </Radio>
              )
            })}
          </Radio.Group>
          <Divider className='tw-my-3' />
          <Button
            icon={<PlusCircleFilled />}
            className='tw-flex tw-items-center hover:!tw-border-primary hover:!tw-text-primary'
            size='large'
            onClick={() => setAddFormVisiblity(true)}
          >
            Thêm địa chỉ mới
          </Button>
        </div>
      </Modal>
      <AddressForm open={addFormVisiblity} onClose={() => setAddFormVisiblity(false)} />
    </>
  )
}

export default AddressSelector
