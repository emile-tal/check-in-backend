import configuration from '../knexfile.js'
import express from 'express'
import initKnex from 'knex'

const knex = initKnex(configuration)
const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        try {
            const stats = await knex(`stats`).where({ user_id: req.id.id }).first()
            if (!stats) {
                return res.status(400).json({ message: "User does not exist" })
            }
            const { games_played_single, games_played_multi, total_points, max_score } = stats
            res.status(200).json({
                message: 'User stats retrieved successfully',
                games_played_single: games_played_single,
                games_played_multi: games_played_multi,
                total_points: total_points,
                max_score: max_score
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve stats for user ${req.id.id}` })
        }
    })
    .put(async (req, res) => {
        const {
            games_played_single,
            games_played_multi,
            total_points,
            max_score
        } = req.body
        try {
            await knex(`stats`).where({ user_id: req.id.id }).update({
                games_played_single,
                games_played_multi,
                total_points,
                max_score
            })
            const updatedStats = await knex('stats').where({ user_id: req.id.id })
            res.status(200).json({
                message: 'User stats updated successfully',
                update: updatedStats
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve update stats for user ${req.id.id}` })
        }
    })

export default router