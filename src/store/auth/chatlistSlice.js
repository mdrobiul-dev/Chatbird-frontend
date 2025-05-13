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


const chatlistSlice = createSlice({
  name: "chatList",
  initialState: {
    conversationList: null,
    selectedConversation: null,
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
      });
  },
});

export const {selectConversation} = chatlistSlice.actions;
export default chatlistSlice.reducer;
