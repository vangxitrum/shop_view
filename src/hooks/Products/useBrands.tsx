import { useQuery } from '@tanstack/react-query'
import { ProductServices } from '~/services'

export const useBrands = () => {
  const { isLoading, isError, isFetching, data, error } = useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      try {
        const res = await ProductServices.getProductBrands()
        return res.data
      } catch (error) {
        throw error
      }
    },
    keepPreviousData: true
  })

  return { isLoading, isError, isFetching, data, error }
}
