/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex('multiplayer').del();
    await knex('multiplayer').insert([
        {
            id: 1,
            user_id: 1,
            game_id: 2
        },
        {
            id: 2,
            user_id: 2,
            game_id: 2,
        }
    ])
}