/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('necks' , (table) => {
      table.increments('id').primary();
      table.boolean('difficulty_Swallowing');
      table.boolean('senseOfBulging');
      table.boolean('hoarseness');
      table.string('details').notNullable();
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
  await knex.schema.dropTable('necks') ;
};
