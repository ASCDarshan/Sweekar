// src/features/consultation/consultationSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consultations: [],
  loading: false,
  error: null
};

const consultationSlice = createSlice({
  name: 'consultation',
  initialState,
  reducers: {
    // Add your consultation reducers here
  }
});

export const { } = consultationSlice.actions;
export default consultationSlice.reducer;