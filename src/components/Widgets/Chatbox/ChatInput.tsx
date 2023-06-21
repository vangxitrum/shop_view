import { Button, Input, Space, Upload } from 'antd'
import { useState } from 'react'
import { Icon } from '~/components/Generals'

const ChatInput = ({ onSendMessage }: { onSendMessage: Function }) => {
  const [value, setValue] = useState<string>('')

  const handleSubmitFile = (options: any) => {
    const { file } = options
    onSendMessage(file, 'image')
  }

  const handleSubmitMessage = () => {
    if (value.trim() !== '') {
      onSendMessage(value, 'text')
      setValue('')
    }
  }

  return (
    <div className='tw-w-full tw-h-full tw-p-3'>
      <div className='tw-flex tw-items-center tw-w-full tw-gap-2'>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onPressEnter={() => handleSubmitMessage()}
          className='tw-flex-1'
        />
        <Space size={[4, 4]}>
          <Button icon={<Icon name='SendOutlined' />} className='tw-border-0' onClick={() => handleSubmitMessage()} />
          <Upload customRequest={handleSubmitFile} showUploadList={false} accept='image/*' multiple={false}>
            <Button icon={<Icon name='PaperClipOutlined' />} />
          </Upload>
        </Space>
      </div>
    </div>
  )
}
export default ChatInput
