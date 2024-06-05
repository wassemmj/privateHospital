/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('patientRoom' , (table) => {
        table.increments('id').primary();
        table.integer('roomID').unsigned().notNullable();
        table.foreign('roomID').references('rooms.id');
        table.integer('patientID').unsigned().notNullable();
        table.foreign('patientID').references('patients.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('patientRoom') ;
};
