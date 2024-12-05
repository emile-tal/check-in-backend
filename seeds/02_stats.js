/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex('stats').del();
    await knex('stats').insert([
        {
            id: 1,
            user_id: 1,
            games_played_single: 5,
            games_played_multi: 5,
            total_points: 600,
            max_score: 75
        },
        {
            id: 2,
            user_id: 2,
            games_played_single: 0,
            games_played_multi: 0,
            total_points: 0,
            max_score: 0
        }
    ])
}