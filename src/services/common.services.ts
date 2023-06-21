import instance from './api'

export const getProvinces = () => {
  return instance.get('/provinces')
}

export const getDistrict = (province_id: string) => {
  return instance.get(`/districts/${province_id}`)
}

export const getWard = (district_id: string) => {
  return instance.get(`/wards/${district_id}`)
}
