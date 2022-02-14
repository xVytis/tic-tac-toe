import React from 'react';
import socketio from "socket.io-client";
 
const socket = socketio(); 
socket.connect();

export {socket};
export const SocketContext = React.createContext(socket);
