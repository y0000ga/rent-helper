import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allRoom: [],
  currentRoom: [],
  isModalShown: false,
}

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    setIsModalShown(state) {
      state.isModalShown = !state.isModalShown
    },
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
    meetCondition(state, action) {
      const { meetId, ConditionId } = action.payload
      const existedIndex = state.currentRoom.conditions.findIndex(
        (data) => data.id === ConditionId
      )
      state.currentRoom.conditions[existedIndex].meetId = meetId
    },
    notMeetCondition(state, action) {
      const { ConditionId } = action.payload
      const existedIndex = state.currentRoom.conditions.findIndex(
        (data) => data.id === ConditionId
      )
      state.currentRoom.conditions[existedIndex].meetId = null
    },
  },
})

export const roomActions = roomSlice.actions
export default roomSlice.reducer
