/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('nurses' , (table) => {
      table.increments('id').primary();
      table.integer('userID').unsigned().notNullable();
      table.foreign('userID').references('users.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
 await knex.schema.dropTable('nurses') ;
};
