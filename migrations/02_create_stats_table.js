/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('stats', (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.integer('games_played_single').unsigned()
        table.integer('games_played_multi').unsigned()
        table.integer('total_points').unisnged()
        table.integer('max_score').unsigned()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('stats')
}