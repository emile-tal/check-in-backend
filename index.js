import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT || 8081;

const app = express()

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})