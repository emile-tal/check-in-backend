/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.alterTable('multiplayer', function (table) {
        table.boolean('is_open').notNullable().defaultTo(knex.raw('TRUE'))
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.table('multiplayer', function (table) {
        table.dropColumn('is_open')
    })
}