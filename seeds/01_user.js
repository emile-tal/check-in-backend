import { hashPass } from "../security.js";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
    const userPassword = await hashPass('password')
    const otheruserPassword = await hashPass('otherpassword')

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