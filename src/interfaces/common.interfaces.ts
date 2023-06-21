enum StatusTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  LOADING = 'loading'
}

enum Breakpoints {
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl'
}

interface RouteType {
  key: string
  label: string
  path: string
}

interface ListParams {
  page: number
  pageSize: number
  status?: StatusTypes
  keyword?: string
}

interface AppState {
  isMobile: boolean
  currentBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
  mobileNavVisible: boolean
  notification?: {
    type: 'success' | 'info' | 'warning' | 'error'
    message: string
    description?: string
  }
}

type MessageType = 'text' | 'image'

type MessageStatusType = 'sent' | 'waiting' | 'unsent'
interface Message {
  value: string
  is_user: boolean
  type: MessageType
  createdAt: Date
  status?: MessageStatusType
}

export { Breakpoints, StatusTypes }
export type { ListParams, AppState, RouteType, Message }
