/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('doctorWorkingTimes' , (table) => {
      table.increments('id').primary();
      table.integer('doctorID').unsigned().notNullable();
      table.string('day').notNullable();
      table.time('start').notNullable();
      table.time('end').notNullable();
      table.foreign('doctorID').references('doctors.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('doctorWorkingTimes') ;
};
