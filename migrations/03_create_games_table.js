/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('games', (table) => {
        table.increments('id').primary()
        table.integer('user_id').unsigned().references('user.id').onUpdate('CASCADE').onDelete('CASCADE')
        table.string('name').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
        table.string('draw_0').notNullable()
        table.string('draw_1').notNullable()
        table.string('draw_2').notNullable()
        table.boolean('is_singleplayer').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('games')
}