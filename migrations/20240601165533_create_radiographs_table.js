/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('radiographs' , (table) => {
      table.increments('id').primary();
      table.integer('doctorID').unsigned().notNullable();
      table.integer('patientID').unsigned().notNullable();
      table.string('askRadiographs').notNullable();
      table.string('document');
      table.string('image');
      table.foreign('doctorID').references('doctors.id');
      table.foreign('patientID').references('patients.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('radiographs') ;
};
