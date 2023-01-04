import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allRoom: [],
  currentRoom: [],
}

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    getCurrentRoom(state, action) {
      state.currentRoom = action.payload
    },
    getAllHouses(state, action) {
      state.allRoom = action.payload
    },
    addHouse(state, action) {
      state.allRoom.unshift(action.payload)
    },
    changeHousesPage(state, action) {
      state.allRoom = state.allRoom.concat(action.payload)
    },
    addExpenses(state, action) {
      const { expense, id } = action.payload
      state.currentRoom.house.Expenses =
        state.currentRoom.house.Expenses.concat(expense)
      const existedItem = state.allRoom.findIndex((data) => data.id === id)
      state.allRoom[existedItem].extraExpenses =
        Number(state.allRoom[existedItem].extraExpenses) + Number(expense.price)
    },
    removeExpense(state, action) {
      const { HouseId, price, id } = action.payload
      state.currentRoom.house.Expenses =
        state.currentRoom.house.Expenses.filter((data) => data.id !== id)
      const existedItem = state.allRoom.findIndex((data) => data.id === HouseId)
      state.allRoom[existedItem].extraExpenses =
        Number(state.allRoom[existedItem].extraExpenses) - Number(price)
    },
    removeHouse(state, action) {
      const { id } = action.payload
      state.allRoom = state.allRoom.filter((data) => data.id !== id)
    },
    editComment(state, action) {
      const { id, comment } = action.payload
      const existedItem = state.allRoom.findIndex((data) => data.id === id)
      state.allRoom[existedItem].comment = comment
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice.reducer

// HouseId
// :
// 8
// UserId
// :
// 2
// createdAt
// :
// "2023-01-04T13:51:49.000Z"
// id
// :
// 24
// name
// :
// "ads"
// price
// :
// 111
