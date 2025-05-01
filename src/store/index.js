import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store; // ✅ remove the curly braces!
