import configuration from '../knexfile.js'
import express from 'express'
import initKnex from 'knex'

const knex = initKnex(configuration)
const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        try {
            const multiplayerGames = await knex('multiplayer')
                .where({ is_open: 1 })
                .join('games', 'multiplayer.game_id', 'games.id')
                .select("games.id", "games.name",)
            if (!multiplayerGames) {
                return res.status(404).json({ message: 'No games found at this moment' })
            }
            res.status(200).json({ message: 'Games retrieved successfully', games: multiplayerGames })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

//{ message: 'Unable to retrieve multiplayer game details' }

export default router