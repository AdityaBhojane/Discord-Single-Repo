import { create } from 'zustand';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
}

interface Channel {
  id: string;
  name: string;
}

interface SocketState {
  socket: Socket;
  currentChannel: Channel | null;
  messageList: Message[];
  joinChannel: (channelId: string) => void;
  setMessageList: (messages: Message[]) => void;
}


export const useSocketContext = create<SocketState>((set) => {
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

  socket.on('NewMessageReceived', (data: Message) => {
    console.log('New message received', data);
    set((state) => ({ messageList: [...state.messageList, data] }));
  });

  return {
    socket,
    currentChannel: null,
    messageList: [],

    joinChannel: (channelId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      socket.emit('JoinChannel', { channelId }, (response: { data: any; }) => {
        console.log('Successfully joined the channel', response);
        set({ currentChannel: response?.data || null });
      });
    },

    setMessageList: (messages: Message[]) => set({ messageList: messages }),
  };
});
