/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('mannerOfDeaths' , (table) => {
      table.increments('id').primary();
      table.boolean('normal');
      table.boolean('notSpecified');
      table.boolean('nonNormal');
      table.integer('deathFileID').unsigned().notNullable();
      table.foreign('deathFileID').references('deathFiles.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('mannerOfDeaths') ;
};
