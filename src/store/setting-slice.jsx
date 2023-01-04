import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    conditions: [],
  },
  reducers: {
    getAllCondition(state, action) {
      state.conditions = action.payload
    },
    addCondition(state, action) {
      const { name } = action.payload
      const isExisted = state.conditions.includes(name)
      if (isExisted === false) {
        state.conditions.unshift(action.payload)
      }
    },
    removeCondition(state, action) {
      const { id } = action.payload
      state.conditions = state.conditions.filter((data) => data.id !== id)
    },
  },
})

export const settingActions = settingSlice.actions
export default settingSlice.reducer
