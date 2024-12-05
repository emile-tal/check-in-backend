/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex('games').del();
    await knex('games').insert([
        {
            id: 1,
            user_id: 1,
            name: 'my_game',
            draw_0: 'pool',
            draw_1: 'pool',
            draw_2: 'ballroom',
            is_singleplayer: true
        },
        {
            id: 2,
            user_id: 1,
            name: 'my_other_game',
            draw_0: 'bar',
            draw_1: 'restaurant',
            draw_2: 'golf',
            is_singleplayer: false
        }
    ])
}