import { configureStore } from '@reduxjs/toolkit'
import searchSlice from './search-slice'
import authSlice from './auth-slice'

const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice,
  },
})

export default store
