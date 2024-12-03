/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('tiles', (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('game_id').unsigned().references('games.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.string('room').notNullable()
        table.tinyint('row').notNullable()
        table.tinyint('column').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('tiles')
}