/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    await knex('tiles').del();
    await knex('tiles').insert([
        {
            id: 1,
            user_id: 1,
            game_id: 1,
            room: 'lobby',
            row: 3,
            column: 3
        },
        {
            id: 2,
            user_id: 1,
            game_id: 1,
            room: 'lobby',
            row: 2,
            column: 2
        },
        {
            id: 3,
            user_id: 1,
            game_id: 1,
            room: 'pool',
            row: 2,
            column: 3
        },
        {
            id: 4,
            user_id: 1,
            game_id: 1,
            room: 'pool',
            row: 2,
            column: 4
        },
        {
            id: 5,
            user_id: 1,
            game_id: 1,
            room: 'pool',
            row: 3,
            column: 2
        },
        {
            id: 6,
            user_id: 1,
            game_id: 1,
            room: 'pool',
            row: 3,
            column: 4
        },
        {
            id: 7,
            user_id: 1,
            game_id: 1,
            room: 'pool',
            row: 4,
            column: 3
        },
        {
            id: 8,
            user_id: 1,
            game_id: 2,
            room: 'lobby',
            row: 3,
            column: 3
        },
        {
            id: 9,
            user_id: 1,
            game_id: 2,
            room: 'golf',
            row: 3,
            column: 2
        },
        {
            id: 10,
            user_id: 1,
            game_id: 2,
            room: 'golf',
            row: 3,
            column: 4
        },
        {
            id: 11,
            user_id: 1,
            game_id: 2,
            room: 'lobby',
            row: 3,
            column: 5
        },
        {
            id: 12,
            user_id: 1,
            game_id: 2,
            room: 'restaurant',
            row: 2,
            column: 5
        },
        {
            id: 13,
            user_id: 2,
            game_id: 2,
            room: 'lobby',
            row: 3,
            column: 3
        },
        {
            id: 14,
            user_id: 2,
            game_id: 2,
            room: 'restaurant',
            row: 2,
            column: 3
        },
        {
            id: 15,
            user_id: 2,
            game_id: 2,
            room: 'restaurant',
            row: 3,
            column: 2
        },
        {
            id: 16,
            user_id: 2,
            game_id: 2,
            room: 'lobby',
            row: 2,
            column: 2
        },
        {
            id: 17,
            user_id: 2,
            game_id: 2,
            room: 'bar',
            row: 3,
            column: 4
        },
    ])
}