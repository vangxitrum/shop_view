import { useState, useEffect } from 'react'
import { ProductCard, ProductSkeleton } from '../Products'
import { Carousel } from 'antd'
import { ProductServices } from '../../services'
import { ProductType } from '~/interfaces'

const BigSizeProductCarousel = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      setLoading(true)
      const res: any = await ProductServices.getProducts({
        page: 1,
        page_size: 20
      })
      setProducts(res.data || [])
    } catch (error) {
      // dispatch()
    } finally {
      setLoading(false)
    }
  }

  const settings = {
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
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
          slidesToScroll: 2,
          infinite: true
        }
      }
    ]
  }

  return (
    <div>
      <Carousel {...settings} draggable>
        {loading || !products.length
          ? [...Array(10)].map((_, index) => <ProductSkeleton key={`product-skeleton-${index}`} />)
          : products.map((product: ProductType) => {
              return (
                <div key={`product-${product.id}`}>
                  <ProductCard product={product} isLandingPage={true} />
                </div>
              )
            })}
      </Carousel>
    </div>
  )
}

export default BigSizeProductCarousel
