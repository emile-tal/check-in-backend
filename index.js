import { Server } from "socket.io";
import configuration from './knexfile.js'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import gamesRoutes from './routes/games_routes.js'
import initKnex from 'knex'
import multiRoutes from './routes/multi_routes.js'
import statsRoutes from './routes/stats_routes.js'
import usersRoutes from './routes/users_routes.js'
import { verifyToken } from './security.js'

const knex = initKnex(configuration)

dotenv.config()

const PORT = process.env.PORT || 8081;

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/stats', verifyToken, statsRoutes)
app.use('/games', verifyToken, gamesRoutes)
app.use('/multi', verifyToken, multiRoutes)

const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
    }
})

io.on('connection', (socket) => {

    socket.on('join room', async (roomName) => {
        await socket.join(roomName)
        const room = io.sockets.adapter.rooms.get(roomName);
        const size = room ? room.size : 0;
        socket.to(roomName).emit("room size", size)
    })

    socket.on('leave room', async (roomName) => {
        await socket.leave(roomName)
        const room = io.sockets.adapter.rooms.get(roomName);
        const size = room ? room.size : 0;
        socket.to(roomName).emit("room size", size)
    })

    socket.on('start game', async ({ roomName, drawTiles }) => {
        socket.to(roomName).emit('start', drawTiles)
        await knex('multiplayer').where({ game_id: roomName }).update({ is_open: false })
    })

    socket.on('played', (roomName, tilesInPlay, drawTiles, gridSize, opponentPoints, opponentTurns) => {
        socket.to(roomName).emit('opponent played', tilesInPlay, drawTiles, gridSize, opponentPoints, opponentTurns)
    })

    socket.on('disconnect', () => console.log('user disconnected'))
})