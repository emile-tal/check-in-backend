import bcrypt from 'bcrypt'
import configuration from '../knexfile.js'
import dotenv from 'dotenv'
import express from 'express'
import initKnex from 'knex'
import jwt from 'jsonwebtoken'

dotenv.config()

const saltRounds = 10

const knex = initKnex(configuration)
const router = express.Router()

const hashPass = async (password) => {
    try {
        const hashedPass = await bcrypt.hash(password, saltRounds)
        return hashedPass
    } catch (error) {
        console.error(error)
    }
}

const checkPass = async (password, dbPass) => {
    try {
        const match = await bcrypt.compare(password, dbPass)
        return match
    } catch (error) {
        console.error(error)
    }
}

router.route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ message: "Username and password is required" })
        }

        try {
            const user = await knex('user').where({ username: username }).first()
            if (!user) {
                return res.status(401).json({ message: "Username is incorrect" })
            }
            if (!checkPass(password, user.password)) {
                return res.status(401).json({ message: "Password is incorrect" })
            }
            const jwtToken = jwt.sign(
                { id: user.id, name: user.username }, process.env.JWT_SECRET
            )
            res.status(200).json({ message: "Login successful", token: jwtToken })
        } catch (error) {
            res.status(500).json({ message: 'Unable to process login' })
        }
    })

router.route('/register')
    .post(async (req, res) => {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Username, password and email is required" })
        }
        try {
            const hashedPass = await hashPass(password)
            console.log(hashedPass)
            const [newUserId] = await knex('user').insert({
                username,
                password: hashedPass,
                email
            })
            const jwtToken = jwt.sign(
                { id: newUserId, name: username }, process.env.JWT_SECRET
            )
            res.status(201).json({ message: "User created successfully", token: jwtToken })
        } catch (error) {
            res.status(500).json({ message: 'Unable to process login' })
        }
    })

export default router