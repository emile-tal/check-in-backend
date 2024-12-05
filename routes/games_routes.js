import configuration from '../knexfile.js'
import express from 'express'
import initKnex from 'knex'

const knex = initKnex(configuration)
const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        try {
            const games = await knex(`games`).where({ user_id: req.id.id })
            if (!games) {
                return res.status(400).json({ message: `No games found for user ${req.id.id}` })
            }
            const sendGames = games.map(({ id, name, updated_at, is_singleplayer }) => ({ id, name, updated_at, is_singleplayer }))
            res.status(200).json({
                message: 'Games details retrieved successfully',
                games: sendGames
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve saved games for user ${req.id.id}` })
        }
    })

router.route('/:id')
    .get(async (req, res) => {
        try {
            const game = await knex(`games`).where({ user_id: req.id.id, id: req.params.id }).first()
            if (!game) {
                return res.status(400).json({ message: `No game with id ${req.params.id} found` })
            }
            const { user_id, name, created_at, updated_at, ...sendGame } = game
            res.status(200).json({
                message: 'Game details retrieved successfully',
                game: sendGame
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve game ${req.params.id} for user ${req.id.id}` })
        }
    })

router.route('/:id/tiles')
    .get(async (req, res) => {
        try {
            const tiles = await knex(`tiles`).where({ game_id: req.params.id })
            if (!tiles) {
                return res.status(400).json({ message: `No tiles found for game ${req.params.id}` })
            }
            res.status(200).json({
                message: 'Game details retrieved successfully',
                tiles: tiles
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve game ${req.params.id} for user ${req.id.id}` })
        }
    })

export default router