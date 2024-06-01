/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('consults' , (table) => {
    table.increments('id').primary();
    table.integer('doctorID').unsigned().notNullable();
    table.integer('consultingDoctorID').unsigned().notNullable();
    table.string('response').notNullable();
    table.foreign('doctorID').references('doctors.id');
    table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('consults') ;
};
