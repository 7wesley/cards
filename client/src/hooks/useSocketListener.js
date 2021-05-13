/**
 * For maintaining and initializing the sockets
 * @author Nathan Jenkins
 * @author Wesley Miller
 * @version 5/13/2021
 */

import { getSocket, disconnectSocket } from "../components/Socket";
import { useEffect, useState } from 'react';

/**
 * Finds the information of the socket that the user is connected to
 * @param {any} connected if the user is connected to a socket
 * @returns the gameroom information if the user is connected
 */
const useSocketListener = (connected) => {
    const socket = getSocket();
    const [players, setPlayers] = useState([]);
    const [countdown, setCountdown] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [timer, setTimer] = useState(null);
    const [turn, setTurn] = useState();
    const [message, setMessage] = useState("");
    const [winners, setWinners] = useState();
    
    useEffect(() => {
        //prevents socket from connecting if room is full
        if (connected) {
            console.log('connected')
            socket.on('countdown', (secs) => setCountdown(secs));
            socket.on('update-hands', (plyrs) => setPlayers(plyrs));
            socket.on('curr-turn', (user) => setTurn(user));
            socket.on('your-turn', (msg) => setPrompt(msg));
            socket.on('timer', (secs) => setTimer(secs));
            socket.on('alert', (msg) => setMessage(msg));
            socket.on('winners', (winList) => setWinners(winList));
            return () => {
                console.log('dc');
                disconnectSocket();
            }
        }
    }, [connected, socket])

    return {players, countdown, prompt, turn, timer, message, winners};
}

export default useSocketListener;