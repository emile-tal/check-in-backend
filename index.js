import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import usersRoutes from './routes/users_routes.js'

dotenv.config()

const PORT = process.env.PORT || 8081;

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRoutes)

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})