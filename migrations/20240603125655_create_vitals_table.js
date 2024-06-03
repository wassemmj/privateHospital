/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    await knex.schema.createTable('vitals',(table)=>{
        table.increments('id').primary();
        table.integer('HR');
        table.integer('BP');
        table.integer('Rr');
        table.integer('Temp');
        table.integer('SPO2');
        table.string('other');
        table.integer('IntensiveCareID').unsigned().notNullable();
        table.foreign('IntensiveCareID').references('intensiveCares.id');
        table.timestamps(true,true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('vitals');
};
