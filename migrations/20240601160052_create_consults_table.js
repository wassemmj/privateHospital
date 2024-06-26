/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('consults' , (table) => {
    table.increments('id').primary();
    table.integer('doctorID').unsigned().notNullable();
    table.string('consults').notNullable();
    table.string('response').nullable();
    table.integer('consultingDoctorID').unsigned().nullable() ;
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
