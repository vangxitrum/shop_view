import { useQuery } from '@tanstack/react-query'
import { ProductServices } from '~/services'

export const useTypes = () => {
  const { isLoading, isError, isFetching, data, error } = useQuery({
    queryKey: ['types'],
    queryFn: async () => {
      try {
        const res = await ProductServices.getProductTypes()
        return res.data
      } catch (error) {
        throw error
      }
    },
    keepPreviousData: true
  })

  return { isLoading, isError, isFetching, data, error }
}
