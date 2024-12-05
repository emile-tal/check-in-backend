import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import gamesRoutes from './routes/games_routes.js'
import statsRoutes from './routes/stats_routes.js'
import usersRoutes from './routes/users_routes.js'
import { verifyToken } from './security.js'

dotenv.config()

const PORT = process.env.PORT || 8081;

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRoutes)
app.use('/stats', verifyToken, statsRoutes)
app.use('/games', verifyToken, gamesRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})