import io from "socket.io-client";
import store from "../store";
import { newMessage, setActiveUsers } from "../store/auth/chatlistSlice";

let socket;

export const initSocket = () => {
  if (!socket) {
    socket = io.connect("https://chatbird-beckend.onrender.com");

    socket.on("connect", () => {
      console.log("Socket is connected with server");

      const userId = store.getState().auth.user._id;
      socket.emit("join_user", userId);
    });

    socket.on("new_message", (res) => {
      console.log("New message received:", res);
      const state = store.getState();
      const selectedConversationId = state.chatList.selectedConversation?._id;

      if (res.message.conversation === selectedConversationId) {
        store.dispatch(newMessage(res.message));
      }
    });

    socket.on("active_users", (activeUserIds) => {
      console.log("Active users list received:", activeUserIds);
      store.dispatch(setActiveUsers(activeUserIds));
    });
  }

  return socket;
};

export const joinRoom = (conversationId) => {
  if (socket) {
    socket.emit("join_room", conversationId);
    console.log("Joined room:", conversationId);
  }
};

export const leaveRoom = (conversationId) => {
  if (socket) {
    socket.emit("leave_room", conversationId);
    console.log("Left room:", conversationId);
  }
};

export const getSocket = () => socket;

