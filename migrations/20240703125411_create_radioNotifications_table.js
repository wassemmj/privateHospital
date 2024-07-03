/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('radioNotifications' , (table) => {
        table.increments('id').primary();
        table.string('message').notNullable();
        table.date('read_at').nullable();
        table.integer('nonMedicalID').unsigned().notNullable();
        table.foreign('nonMedicalID').references('nonMedicals.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('examNotifications') ;
};
