import { Badge, Typography } from 'antd'
import { Icon } from '../Generals'
import { useState, useEffect, useCallback } from 'react'
import ChatContent from './Chatbox/ChatContent'
import type { Message } from '~/interfaces'
import ChatInput from './Chatbox/ChatInput'
import { useAppSelector } from '~/redux/hooks'
import { authState } from '~/redux/reducers/authSlice'
import useWebSocket, { ReadyState } from 'react-use-websocket'
import { UserServices } from '~/services'
const { Text } = Typography

const socketDefaultUrl = 'ws://164.92.130.229:8081/api/open'
const ChatBox = () => {
  const { user, accessToken } = useAppSelector(authState)
  const [isBoxChatVisible, toggleBoxChatVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(true)
  const [dialogId, setDialogId] = useState<any>('')
  const [socketUrl, setSocketUrl] = useState(socketDefaultUrl)
  const { lastJsonMessage } = useWebSocket(socketUrl)

  useEffect(() => {
    window.addEventListener('keydown', handlePressEsc)
    return () => {
      window.removeEventListener('keydown', handlePressEsc)
    }
  }, [])

  useEffect(() => {
    if (isBoxChatVisible) {
      appendMessage()
    }
  }, [isBoxChatVisible])

  useEffect(() => {
    if (lastJsonMessage) {
      const message: any = lastJsonMessage
      setMessages(messages.concat(message as Message))
    }
  }, [lastJsonMessage])

  useEffect(() => {
    if (user) {
      const storageUser = JSON.parse(localStorage.getItem('user') || '{}')
      setSocketUrl((prevUrl) => prevUrl + `/${storageUser.accessToken}`)
    }
  }, [user])

  const appendMessage = async () => {
    try {
      const res = await UserServices.getMessages()
      setDialogId(res.data?.dialog_id)
      setMessages(res.data?.messages)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handlePressEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' || e.keyCode === 27) {
      if (isBoxChatVisible) {
        onCloseBoxChat()
      }
    }
  }

  const onCloseBoxChat = () => {
    toggleBoxChatVisible(false)
    setMessages([])
    setIsFirstTimeRender(false)
  }

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let fileInfo
      let baseURL: string | null | ArrayBuffer = ''
      // Make new FileReader
      let reader = new FileReader()

      // Convert the file to base64 text
      reader.readAsDataURL(file)

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log('Called', reader)
        baseURL = reader.result
        console.log(baseURL)
        resolve(baseURL)
      }
      console.log(fileInfo)
    })
  }

  const onSendMessage = async (content: string | File, type: 'image' | 'text') => {
    let newMessage: any = {} as Message

    if (type === 'text') {
      newMessage.dialog_id = dialogId
      newMessage.is_user = true
      newMessage.value = content
      newMessage.type = 'text'
    } else {
      newMessage.type = 'image'
      // newMessage.content = 'https://randomwordgenerator.com/img/picture-generator/hai-3483459_640.jpg'
      // getBase64(content as File, (url) => {
      //   newMessage.content = url
      // })
      newMessage.content = await getBase64(content as File)
    }
    try {
      const res = await UserServices.sendMegessage(newMessage)
      setMessages(messages.concat(res.data))
    } catch (error) {
      console.log('error', error)
    }
    setIsFirstTimeRender(true)
  }

  if (!isBoxChatVisible) {
    return (
      <Badge
        count={1}
        overflowCount={99}
        className='tw-fixed tw-z-[2147483647] tw-rounded-full tw-bottom-[100px] tw-cursor-pointer tw-h-[35px] tw-w-[35px] tw-bg-primary tw-text-white tw-right-[12px] tw-text-center'
      >
        <div
          className='tw-h-full tw-w-full tw-flex tw-items-center tw-justify-center'
          onClick={() => toggleBoxChatVisible(true)}
        >
          <Icon name='MessageOutlined' className='' style={{ fontSize: '18px' }} />
        </div>
      </Badge>
    )
  } else {
    return (
      <div className='tw-fixed tw-z-[2147483647] tw-rounded-lg tw-shadow-xl tw-overflow-hidden tw-bottom-[100px] tw-right-[12px] tw-h-[500px] tw-w-[350px] tw-bg-white tw-animate-fadeFromRight'>
        <div className='tw-h-full tw-w-full tw-flex tw-flex-col'>
          <header className='tw-p-3 tw-bg-primary tw-text-white tw-relative'>
            <Text className='tw-text-sm tw-text-white tw-font-semibold'>Liên hệ tư vấn</Text>
            <Icon
              name='CloseCircleOutlined'
              className='tw-text-base tw-absolute tw-right-[12px] tw-top-1/2 -tw-translate-y-1/2 tw-cursor-pointer'
              onClick={() => onCloseBoxChat()}
            />
          </header>
          <div className='tw-flex-1 tw-relative'>
            <ChatContent
              messages={messages}
              getMore={appendMessage}
              isFirstTimeRender={isFirstTimeRender}
              setIsFirstTimeRender={setIsFirstTimeRender}
            />
          </div>
          <div className='tw-h-14'>
            <ChatInput onSendMessage={onSendMessage} />
          </div>
        </div>
      </div>
    )
  }
}

export default ChatBox
