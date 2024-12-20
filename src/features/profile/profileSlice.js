// src/features/profile/profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  loading: false,
  error: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    // Add your profile reducers here
  }
});

export const { } = profileSlice.actions;
export default profileSlice.reducer;