import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import chatlistReducer from "./auth/chatlistSlice";

const store = configureStore({
   reducer: {
    auth: authReducer,
    chatList: chatlistReducer,
  },
});

export default store;
