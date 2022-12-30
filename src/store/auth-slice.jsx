import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  account: { content: '', isValid: false },
  password: { content: '', isValid: false },
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
})

export const authAction = authSlice.actions
export default authSlice.reducer
