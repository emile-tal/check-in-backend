import { hashPass } from "../security.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    const userPassword = await hashPass('pass')
    const otheruserPassword = await hashPass('otherpass')

    await knex('user').del();
    await knex('user').insert([
        {
            id: 1,
            username: 'user',
            email: 'email@email.com',
            password: userPassword
        },
        {
            id: 2,
            username: 'otheruser',
            email: 'otheremail@email.com',
            password: otheruserPassword
        }
    ])
}