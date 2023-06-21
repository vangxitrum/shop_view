import { RouteType } from '~/interfaces'

export const routes: RouteType[] = [
  {
    key: '/',
    label: 'Trang chủ',
    path: '/'
  },
  {
    key: '/san-pham',
    label: 'Sản phẩm',
    path: '/san-pham'
  },
  {
    key: '/bai-viet',
    label: 'Tin tức',
    path: '/bai-viet'
  },
  {
    key: '/ve-chung-toi',
    label: 'Về chúng tôi',
    path: '/ve-chung-toi'
  },
  {
    key: '/lien-he',
    label: 'Liên hệ',
    path: '/lien-he'
  }
]
