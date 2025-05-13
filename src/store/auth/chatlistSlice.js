import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatServices } from "../../services/api";

export const fetchChatlist = createAsyncThunk(
  "/chat/fetchChatlist",
  async () => {
    try {
      const res = await chatServices.conversationList();
      return res.success; 
    } catch (error) {
      throw error;
    }
  }
);

export const fetchMessage = createAsyncThunk(
  "/chat/fetchMessage",
  async (conversationID) => {
    try {
      const res = await chatServices.getMessages(conversationID);
      return res.success; 
    } catch (error) {
      throw error;
    }
  }
);

const chatlistSlice = createSlice({
  name: "chatList",
  initialState: {
    conversationList: null,
    selectedConversation: null,
    messages : [],
    status: "active",
    error: null,
  },
  reducers: {
     selectConversation: (state, actions)=>{
     state.selectedConversation = actions.payload;
     }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatlist.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChatlist.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversationList = action.payload; 
      })
      .addCase(fetchChatlist.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })

      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload; 
      })
  },
});

export const {selectConversation} = chatlistSlice.actions;
export default chatlistSlice.reducer;
