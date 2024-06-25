/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('abdomenAreas' , (table) => {
      table.increments('id').primary();
      table.integer('otherID').unsigned().notNullable();
      table.foreign('otherID').references('otherSystems.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await  knex.schema.dropTable('abdomenAreas') ;
};
