import axios from 'axios'
import { baseURL } from '../configData'

const searchesURL = `${baseURL}searches`

const axiosInstance = axios.create({ baseURL: searchesURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增搜尋條件
export const searchCreateApi = async (payload) => {
  const {
    name,
    keyword,
    region,
    sections,
    kind,
    shape,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    notCover,
  } = payload

  try {
    const res = await axiosInstance.post(`${searchesURL}`, {
      name,
      keyword,
      region,
      sections,
      kind,
      shape,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      notCover,
    })
    return res
  } catch (error) {
    console.error('[Search Create Failed]: ', error)
    return error.response
  }
}

// 取得全部搜尋條件名稱
export const searchGetAllApi = async () => {
  try {
    const res = axiosInstance.get(`${searchesURL}`)
    return res
  } catch (error) {
    console.error('[Search Get All Failed]: ', error)
    return error.response
  }
}

// 編輯單一搜尋條件
export const searchEditApi = async (payload) => {
  const {
    id,
    name,
    keyword,
    region,
    sections,
    kind,
    shape,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    notCover,
  } = payload
  try {
    const res = axiosInstance.put(`${searchesURL}/${id}`, {
      name,
      keyword,
      region,
      sections,
      kind,
      shape,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      notCover,
    })
    return res
  } catch (error) {
    console.error('[Search Edit Failed]: ', error)
    return error.response
  }
}

// 刪除單一搜尋條件
export const searchDeleteApi = async (payload) => {
  const { id } = payload
  try {
    const res = axiosInstance.delete(`${searchesURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Search Delete Failed]: ', error)
    return error.response
  }
}
