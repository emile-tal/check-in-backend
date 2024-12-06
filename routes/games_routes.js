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
                return res.status(404).json({ message: `No games found for user ${req.id.id}` })
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
    .post(async (req, res) => {
        const { name, draw_0, draw_1, draw_2, is_singleplayer } = req.body
        if (!name || !draw_0 || !draw_1 || !draw_2 || !is_singleplayer) {
            return res.status(400).json({ message: 'All fields are required to save new game' })
        }
        try {
            const [newGameId] = await knex(`games`).insert({
                user_id: req.id.id,
                name,
                draw_0,
                draw_1,
                draw_2,
                is_singleplayer
            })
            const newGame = await knex(`games`).where({ id: newGameId }).first()
            res.status(201).json({
                message: `Successfully saved game`,
                game: newGame
            })
            if (is_singleplayer !== true) {
                await knex('multiplayer').insert({
                    user_id: req.id.id,
                    game_id: newGameId,
                })
            }
        } catch (error) {
            res.status(500).json({ message: `Unable to save game` })
        }
    })

router.route('/:id')
    .get(async (req, res) => {
        try {
            const game = await knex(`games`).where({ id: req.params.id }).first()
            if (!game) {
                return res.status(404).json({ message: `No game with id ${req.params.id} found` })
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
    .put(async (req, res) => {
        const { name, draw_0, draw_1, draw_2 } = req.body
        if (!name || !draw_0 || !draw_1 || !draw_2) {
            return res.status(400).message({ message: 'All fields are required to save new game' })
        }
        try {
            const game = await knex(`games`).where({ id: req.params.id }).first()
            if (!game) {
                return res.status(404).json({ message: `No game with id ${req.params.id} found` })
            }
            const newGame = await knex(`games`).where({ id: req.params.id }).first().update({
                name,
                draw_0,
                draw_1,
                draw_2
            })
            res.status(200).json({
                message: 'Game saved successfully',
                game: newGame
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
                return res.status(404).json({ message: `No tiles found for game ${req.params.id}` })
            }
            res.status(200).json({
                message: 'Game details retrieved successfully',
                tiles: tiles
            })
        } catch (error) {
            res.status(500).json({ message: `Unable to retrieve game ${req.params.id} for user ${req.id.id}` })
        }
    })
    .post(async (req, res) => {
        const tiles = req.body
        if (!tiles) {
            res.status(400).json({ message: 'Tiles are required' })
        }
        try {
            await Promise.all(
                tiles.map((tile) =>
                    knex('tiles').insert({
                        user_id: req.id.id,
                        game_id: req.params.id,
                        room: tile.room,
                        row: tile.row,
                        column: tile.column
                    })
                ))
            res.status(201).json({ message: `Tiles successfully saved` })
        } catch (error) {
            res.status(500).json({ message: `Unable to save tiles for game ${req.params.id}` })
        }
    })
    .put(async (req, res) => {
        const tiles = req.body
        if (!tiles) {
            res.status(400).json({ message: 'Tiles are required' })
        }
        try {
            await knex('tiles').where({ game_id: req.params.id }).delete()
            await Promise.all(
                tiles.map((tile) =>
                    knex('tiles').insert({
                        user_id: req.id.id,
                        game_id: req.params.id,
                        room: tile.room,
                        row: tile.row,
                        column: tile.column
                    })
                ))
            res.status(201).json({ message: `Tiles successfully saved` })
        } catch (error) {
            res.status(500).json({ message: `Unable to save tiles for game ${req.params.id}` })
        }
    })

router.route('/multi')
    .get(async (req, res) => {
        try {
            const multiplayerGames = await knex('multiplayer').where({ is_open: 1 }).join('games', 'multiplayer.games_id', 'game.id')
                .select(
                    "game.id",
                    "game.name",
                )
            if (!multiplayerGames) {
                return res.status(404).json({ message: 'No games found at this moment' })
            }
            res.status(200).json({ message: 'Games retrieved successfully', games: multiplayerGames })
        } catch (error) {
            res.status(500).json({ message: 'Unable to retrieve multiplayer game details' })
        }
    })

export default router