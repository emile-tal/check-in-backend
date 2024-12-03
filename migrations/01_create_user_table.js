/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('user', (table) => {
        table.increments('id').primary()
        table.string('username').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('user')
}
