import io from 'socket.io-client';

export const initSoket = () => {
     const socket = io.connect('http://localhost:8000');

     socket.on("connect", () => {
        console.log("soket is connected with server");
        
     })
}