import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { baseURL } from '../configData'
import Swal from 'sweetalert2'

const housesURL = `${baseURL}houses`
const expensesURL = `${baseURL}expenses`
const meetURL = `${baseURL}meets`

const axiosInstance = axios.create({ baseURL: housesURL })
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

const initialState = {
  allRoom: [],
  currentRoom: [],
  createRoomStatus: { status: 'finish', message: '' },
  hasMoreRoom: false,
  isCollectUpdate: false,
}
// 取得全部物件資訊
export const getAllInfo = createAsyncThunk(
  'room/getAllInfo',
  async (payload) => {
    const { page, filter } = payload
    try {
      const res = await axiosInstance.get(
        `${housesURL}?page=${page}&filter=${filter}`
      )
      return res
    } catch (error) {
      console.error('[Houses All Get Failed]: ', error)
      return error.response
    }
  }
)
// 取得更多資訊
export const getMoreInfo = createAsyncThunk(
  'room/getMoreInfo',
  async (payload) => {
    const { page, filter } = payload
    try {
      const res = await axiosInstance.get(
        `${housesURL}?page=${page}&filter=${filter}`
      )
      return res
    } catch (error) {
      console.error('[Houses All Get Failed]: ', error)
      return error.response
    }
  }
)
// 取得單一物件資訊
export const getOneInfo = createAsyncThunk(
  'room/getOneInfo',
  async (payload) => {
    const { id } = payload
    try {
      const res = await axiosInstance.get(`${housesURL}/${id}`)
      return res
    } catch (error) {
      console.error('[Houses One Get Failed]: ', error)
      return error.response
    }
  }
)
// 編輯單一物件評論
export const editComment = createAsyncThunk(
  'room/editComment',
  async (payload) => {
    const { id, comment } = payload
    try {
      const res = await axiosInstance.put(`${housesURL}/${id}/comment`, {
        comment,
      })
      return res
    } catch (error) {
      console.error('[Houses Edit Comment Failed]: ', error)
      return error.response
    }
  }
)
// 刪除單一物件
export const deleteOne = createAsyncThunk('room/deleteOne', async (payload) => {
  const { id } = payload
  try {
    const res = await axiosInstance.delete(`${housesURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Houses Delete Failed]: ', error)
    return error.response
  }
})
// 增加單一物件
export const createOne = createAsyncThunk('room/createOne', async (payload) => {
  const { externalId } = payload
  try {
    const res = await axiosInstance.post(`${housesURL}`, { externalId })
    return res
  } catch (error) {
    console.error('[Houses Create Failed]: ', error.response)
    return error.response
  }
})
// 增加特定物件支出
export const createExpense = createAsyncThunk(
  'room/createExpense',
  async (payload) => {
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
)
// 刪除特定物件支出
export const deleteExpense = createAsyncThunk(
  'room/deleteExpense',
  async (payload) => {
    const { expenseId } = payload
    try {
      const res = await axiosInstance.delete(`${expensesURL}/${expenseId}`)
      return res
    } catch (error) {
      console.error('[Expense Delete Failed]: ', error)
      return error.response
    }
  }
)
// 符合自定義條件
export const meet = createAsyncThunk('room/meet', async (payload) => {
  const { HouseId, ConditionId } = payload
  try {
    const res = axiosInstance.post(`${meetURL}`, { HouseId, ConditionId })
    return res
  } catch (error) {
    console.error('[Meet Failed]: ', error)
    return error.response
  }
})
// 取消符合自定義條件
export const notMeet = createAsyncThunk('room/notMeet', async (payload) => {
  const { id } = payload
  try {
    const res = axiosInstance.delete(`${meetURL}/${id}`)
    return res
  } catch (error) {
    console.error('[Not Meet Failed]: ', error)
    return error.response
  }
})

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  extraReducers: (builder) => {
    // 取得全部物件資訊
    builder.addCase(getAllInfo.fulfilled, (state, action) => {
      state.allRoom = action.payload.data.houses
    })
    // 取得更多物件資訊
    builder.addCase(getMoreInfo.fulfilled, (state, action) => {
      state.hasMoreRoom = action.payload.data.houses.length
      state.allRoom = state.allRoom.concat(action.payload.data.houses)
    })
    // 取得單一物件資訊
    builder.addCase(getOneInfo.fulfilled, (state, action) => {
      state.currentRoom = action.payload.data
    })
    // 編輯單一物件評論
    builder.addCase(editComment.fulfilled, (state, action) => { 
      const { id, comment } = action.payload.data.house
      const existedItem = state.allRoom.findIndex((data) => data.id === id)
      state.allRoom[existedItem].comment = comment
      state.isCollectUpdate = !state.isCollectUpdate
    })
    // 刪除單一物件
    builder.addCase(deleteOne.fulfilled, (state, action) => {
      const { id } = action.payload.data.house
      state.allRoom = state.allRoom.filter((data) => data.id !== id)
    })
    // 增加單一物件
    builder.addCase(createOne.pending, (state) => {
      state.createRoomStatus = { status: 'loading', message: '' }
    })
    builder.addCase(createOne.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.allRoom.unshift(action.payload.data.house)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: '新增物件成功',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        state.createRoomStatus.message = action.payload.data.message
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: `${action.payload.data.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      }

      state.createRoomStatus.status = 'finish'
    })
    // 增加特定物件支出
    builder.addCase(createExpense.fulfilled, (state, action) => {
      const { expense } = action.payload.data
      state.currentRoom.house.Expenses =
        state.currentRoom.house.Expenses.concat(expense)
      const existedItem = state.allRoom.findIndex(
        (data) => data.id === state.currentRoom.house.id
      )
      state.allRoom[existedItem].extraExpenses =
        Number(state.allRoom[existedItem].extraExpenses) + Number(expense.price)
    })
    // 刪除特定物件支出
    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      const { HouseId, price, id } = action.payload.data.expense
      state.currentRoom.house.Expenses =
        state.currentRoom.house.Expenses.filter((data) => data.id !== id)
      const existedItem = state.allRoom.findIndex((data) => data.id === HouseId)
      state.allRoom[existedItem].extraExpenses =
        Number(state.allRoom[existedItem].extraExpenses) - Number(price)
    })
    // 符合自定義條件
    builder.addCase(meet.fulfilled, (state, action) => {
      const { id, ConditionId } = action.payload.data.meet
      const existedIndex = state.currentRoom.conditions.findIndex(
        (data) => data.id === ConditionId
      )
      state.currentRoom.conditions[existedIndex].meetId = id
    })
    // 取消符合自定義條件
    builder.addCase(notMeet.fulfilled, (state, action) => {
      const { ConditionId } = action.payload.data.meet
      const existedIndex = state.currentRoom.conditions.findIndex(
        (data) => data.id === ConditionId
      )
      state.currentRoom.conditions[existedIndex].meetId = null
    })
  },
  reducers: {
    setIsCollectUpdate(state) {
      state.isCollectUpdate = !state.isCollectUpdate
    },
    clearRoomInfo(state) {
      state.allRoom = initialState.allRoom
      state.currentRoom = initialState.currentRoom
      state.isModalShown = initialState.isModalShown
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice.reducer
