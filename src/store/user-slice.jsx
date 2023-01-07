import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: '',
  hasLineToken: false,
  id: '',
  name: '',
  status: '',
  message: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUserInfo(state, action) {
      const { account, hasLineToken, id, name } = action.payload
      state.account = account
      state.hasLineToken = hasLineToken
      state.id = id
      state.name = name
    },
    setStatus(state, action) {
      state.status = action.payload
    },
    setMessage(state, action) {
      state.message = action.payload
    },
    setHasLineToken(state) {
      state.hasLineToken = true
    },
  },
})

export const userActions = userSlice.actions
export default userSlice.reducer
