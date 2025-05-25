import io from "socket.io-client";
import store from "../store";
import { newMessage } from "../store/auth/chatlistSlice";

let socket;

export const initSocket = () => {
  if (socket) {
    socket.off("new_message");
    return socket;
  }

  socket = io.connect("http://localhost:8000");

  socket.on("new_message", (res) => {
    const state = store.getState();
    const selectedConversationId = state.chatList.selectedConversation?._id;

    if (res.message.conversation === selectedConversationId) {
      store.dispatch(newMessage(res.message));
    }
  });

  socket.on("connect", () => {
    console.log("✅ Socket is connected with server");
  });

  return socket;
};
