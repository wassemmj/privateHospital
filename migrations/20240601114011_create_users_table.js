/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users' , (table) => {
      table.increments('id').primary();
      table.string('fullName').notNullable();
      table.string('phoneNumber').notNullable();
      table.string('fatherName').notNullable();
      table.string('motherName').notNullable();
      table.string('internationalNumber').notNullable();
      table.string('currentLocation').notNullable();
      table.date('birthdate').notNullable();
      table.boolean('gender').notNullable();
      table.string('password').notNullable();
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('users') ;
};
