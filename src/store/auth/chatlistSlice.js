import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatServices } from "../../services/api";

// Async thunk to fetch conversations
export const fetchChatlist = createAsyncThunk(
  "/chat/fetchChatlist",
  async () => {
    try {
      const res = await chatServices.conversationList();
      return res.success; // Assuming .success contains the array
    } catch (error) {
      throw error;
    }
  }
);

// Slice definition
const chatlistSlice = createSlice({
  name: "chatList",
  initialState: {
    conversationList: null,
    status: "active",
    error: null,
  },
  reducers: {}, // keep empty if not needed
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

// Export reducer
export default chatlistSlice.reducer;
