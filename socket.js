import { Server } from "socket.io";

export const setUpSocket = (server) => {
    const io = new Server(server, {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],

    })

    io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('join room', async (roomName) => {
            await socket.join(roomName);

        });
        socket.on('join room', async (roomName) => {
            await socket.leave(roomName);
        });

        socket.on('disconnect', () => console.log('user disconnected'));
    })
}