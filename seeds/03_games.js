/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex('games').del();
    await knex('games').insert([
        {
            id: 1,
            user_id: 1,
            is_singleplayer: true
        },
        {
            id: 2,
            user_id: 1,
            is_singleplayer: false
        }
    ])
}