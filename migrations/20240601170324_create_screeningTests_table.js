/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('screeningTests',(table)=>{
        table.increments('id').primary();
        table.string('result');
        table.string('askTest').notNullable();
        table.integer('patientID').unsigned().notNullable();
        table.foreign('patientID').references('patients.id');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
    await knex.schema.dropTable('screeningTests');
};
