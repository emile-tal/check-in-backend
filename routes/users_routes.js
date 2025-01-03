import { checkPass, hashPass, verifyToken } from '../security.js'

import configuration from '../knexfile.js'
import dotenv from 'dotenv'
import express from 'express'
import initKnex from 'knex'
import jwt from 'jsonwebtoken'

dotenv.config()

const knex = initKnex(configuration)
const router = express.Router()

router.route('/')
    .get(verifyToken, async (req, res) => {
        try {
            const user = await knex(`user`).where({ id: req.id.id }).first()
            if (!user) {
                return res.status(400).json({ message: "User does not exist" })
            }
            const { id, username } = user
            res.status(200).json({ message: 'User information retrieved successfully', id: id, username: username })
        } catch (error) {
            res.status(500).json({ message: 'Unable to retrieve user data' })
        }
    })

router.route('/login')
    .post(async (req, res) => {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password is required" })
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must have 8 characters minimum" })
        }
        try {
            const user = await knex(`user`).where({ username: username }).first()
            if (!user) {
                return res.status(401).json({ message: "User does not exist" })
            }
            const passwordValid = await checkPass(password, user.password)
            if (!passwordValid) {
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

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must have 8 characters minimum" })
        }

        try {
            const userExists = await knex(`user`).where({ username: username }).first()
            if (userExists) {
                return res.status(400).json({ message: "User already exists" })
            }

            const hashedPass = await hashPass(password)
            const [newUserId] = await knex(`user`).insert({
                username,
                password: hashedPass,
                email
            })
            await knex('stats').insert({
                user_id: newUserId,
                games_played_single: 0,
                games_played_multi: 0,
                total_points: 0,
                max_score: 0
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