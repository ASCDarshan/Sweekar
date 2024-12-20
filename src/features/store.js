import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import consultationReducer from './consultation/consultationSlice'
import profileReducer from './profile/profileSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    consultation: consultationReducer,
    profile: profileReducer,
  },
})