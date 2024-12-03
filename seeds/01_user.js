/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex('user').del();
    await knex('user').insert([
        {
            id: 1,
            username: 'user',
            email: 'email@email.com',
            password: 'pass'
        },
        {
            id: 2,
            username: 'otheruser',
            email: 'otheremail@email.com',
            password: 'otherpass'
        }
    ])
}