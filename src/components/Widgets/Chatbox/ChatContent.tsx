import { useEffect, useState, useRef, UIEvent } from 'react'
import { Avatar, Button, Typography } from 'antd'
import type { Message } from '~/interfaces'
const { Paragraph } = Typography
const ContainerHeight = 400

const ChatContent = ({
  messages,
  getMore,
  isFirstTimeRender,
  setIsFirstTimeRender
}: {
  messages: Message[]
  getMore: Function
  isFirstTimeRender: boolean
  setIsFirstTimeRender: Function
}) => {
  const [goToBottomBtnVisible, toggleGoToBottomBtnVisible] = useState<boolean>(false)
  const container = useRef<HTMLDivElement>(null)
  const scrollHeightFirstTime = useRef<number>(0)

  const handleScroll = () => {
    return
    if (container.current && !isFirstTimeRender) {
      const { scrollTop, scrollHeight } = container.current as HTMLDivElement
      if (scrollTop === 0) {
        getMore()
      }
      if (scrollTop <= scrollHeight - scrollHeightFirstTime.current) {
        toggleGoToBottomBtnVisible(true)
      } else {
        toggleGoToBottomBtnVisible(false)
      }
    }
  }

  const scrollToTop = () => {
    if (container.current) {
      const { scrollHeight } = container.current as HTMLDivElement
      if (isFirstTimeRender) {
        scrollHeightFirstTime.current = scrollHeight
      }
      container.current.scrollTo({
        top: scrollHeight,
        left: 0
      })
    }
  }

  const scrollTo = (pixel: number) => {
    if (container.current) {
      container.current.scrollTo({
        top: pixel,
        left: 0
      })
    }
  }

  useEffect(() => {
    if (isFirstTimeRender && messages.length) {
      scrollToTop()
      scrollHeightFirstTime.current = container.current?.scrollHeight || 0
      setIsFirstTimeRender(false)
    } else {
      scrollTo(scrollHeightFirstTime.current)
    }
    console.log('messaages', messages)
  }, [messages])

  return (
    <div
      ref={container}
      style={{ height: ContainerHeight, overflowY: 'scroll' }}
      className='tw-p-3 tw-flex tw-flex-col tw-gap-4 tw-relatives'
      onScroll={handleScroll}
    >
      {messages.map((message: Message) => {
        // if (index === messages.length - 1) {
        //   console.log('message', message)
        // }
        return (
          <div className={`${message.is_user ? 'tw-text-right' : 'tw-flex tw-items-end tw-gap-2'}`}>
            {!message.is_user ? <Avatar /> : null}
            {message.type === 'text' ? (
              <Paragraph
                className={`tw-px-3 tw-py-2 tw-mb-0 tw-text-white  tw-max-w-[66%] tw-rounded-xl tw-inline-block ${
                  message.is_user ? 'tw-ml-auto tw-bg-primary' : 'tw-mr-auto tw-bg-message'
                }`}
              >
                {message.value}
              </Paragraph>
            ) : (
              <img src={message.value} className='tw-w-4/6 tw-rounded-lg' />
            )}
          </div>
        )
      })}
      {goToBottomBtnVisible ? (
        <Button
          onClick={() => scrollToTop()}
          className='tw-absolute tw-rounded-full hover:tw-border-primary hover:tw-text-primary tw-top-[360px] tw-left-1/2 -tw-translate-x-1/2 tw-bg-gray-200'
        >
          Xuống cuối
        </Button>
      ) : null}
    </div>
  )
}

export default ChatContent
