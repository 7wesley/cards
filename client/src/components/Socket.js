
import io from 'socket.io-client';
let socket;

//Connects the the player to the room with the specific id via socket
export const connectSocket = (roomId, id) => {
    socket = io(
        'http://localhost:5000', {
        transports: ['websocket', 'polling', 'flashsocket'],
    })
    console.log(`User connection to room ${roomId}`);
    if (socket && roomId) socket.emit('join', roomId, id);
}

//Disconnects the user from the room by terminating the connection 
//  from the socket
export const disconnectSocket = () => {
    console.log('User disconnecting');
    if (socket) socket.disconnect();
}

export const getSocket = () => {
    return socket;
}