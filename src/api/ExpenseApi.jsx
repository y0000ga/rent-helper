import axios from 'axios'
import { baseURL } from '../configData'

const expensesURL = `${baseURL}expenses`

const axiosInstance = axios.create({ baseURL: expensesURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

// 新增額外支出
export const expenseCreateApi = async (payload) => {
  const { HouseId, name, price } = payload

  try {
    const res = await axiosInstance.post(`${expensesURL}`, {
      HouseId,
      name,
      price,
    })
    return res
  } catch (error) {
    console.error('[Expense Create Failed]: ', error)
    return error.response
  }
}

// 刪除特定 id 額外支出
export const expenseDeleteApi = async (payload) => {
  const { expenseId } = payload
  try {
    const res = await axiosInstance.delete(`${expensesURL}/${expenseId}`)
    return res
  } catch (error) {
    console.error('[Expense Delete Failed]: ', error)
    return error.response
  }
}
