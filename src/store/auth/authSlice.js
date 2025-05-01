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
     console.log(state.user);
    },
  },
})

export const { loggedUser, loggedOut } = authSlice.actions;
export default authSlice.reducer;