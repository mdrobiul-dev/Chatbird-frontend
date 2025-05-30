import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem("loggedUser")) || null,
  },
  reducers: {
    loggedUser: (state, actions) => {
      state.user = actions.payload
    },
    loggedOut: (state) => {
     state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
    },
  },
})

export const { loggedUser, loggedOut } = authSlice.actions;
export default authSlice.reducer;