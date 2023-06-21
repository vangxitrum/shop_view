import React, { useState, useEffect } from 'react'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'
import { routes } from '~/utils'
import { RouteType } from '~/interfaces'
const HomeBreadcrumb: React.FC<{}> = ({}) => {
  const [currentPage, setCurrentPage] = useState<RouteType>()
  const { pathname } = useLocation()

  useEffect(() => {
    const currentRoute = routes.find((route) => pathname.split('?')[0] === route.path)
    if (currentRoute) {
      setCurrentPage(currentRoute)
    }
  }, [pathname])
  return (
    <Breadcrumb
      items={[
        {
          title: 'Trang chủ',
          href: '/'
        },
        {
          title: currentPage?.label
        }
      ]}
    />
  )
}

export default HomeBreadcrumb
