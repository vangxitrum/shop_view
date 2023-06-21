import { useEffect, useState } from 'react'
import { Carousel } from 'antd'
import { BlogCard, BlogSkeleton } from '../Blogs'

import type { BlogItemType } from '~/interfaces'
const NewestBlog = () => {
  const [blogs, setBlogs] = useState<BlogItemType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      getBlogs()
    }, 5e3)
  }, [])

  const getBlogs = async () => {
    try {
      // const response = await
      setBlogs([])
    } catch (err) {
      console.log(err)
    }
  }

  const settings = {
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  }

  return (
    <Carousel draggable {...settings}>
      {loading || !blogs.length
        ? [...Array(6)].map((_, index) => <BlogSkeleton key={`blog-skeleton-${index}`} />)
        : blogs?.map((blog) => <BlogCard {...blog} key={blog.key} />)}
    </Carousel>
  )
}

export default NewestBlog
