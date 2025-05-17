import io from 'socket.io-client';
import store from '../store';
import { newMessage } from '../store/auth/chatlistSlice';

let socket;

export const initSocket = () => {
  if (socket) {
    socket.off('new_message'); // Remove old listener if reusing
    return socket;
  }

  socket = io.connect('http://localhost:8000'); // Use your server URL

  socket.on('new_message', (res) => {
    const state = store.getState();
    const selectedConversationId = state.chatList.selectedConversation?._id;

    // ✅ Only update messages if they belong to the active chat
    if (res.message.conversation === selectedConversationId) {
      store.dispatch(newMessage(res.message));
    }

    // 🔄 Optional: Update unread badge in chat list, etc. if it's a different chat
  });

  socket.on('connect', () => {
    console.log('✅ Socket is connected with server');
  });

  return socket;
};


