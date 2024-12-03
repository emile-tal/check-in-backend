/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('multiplayer', (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('game_id').unsigned().references('games.id').onUpdate('CASCADE').onDelete('CASCADE')
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('multiplayer')
}