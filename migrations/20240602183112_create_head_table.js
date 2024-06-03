/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('heads' , (table) => {
      table.increments('id').primary();
      table.boolean('headache');
      table.boolean('vision');
      table.boolean('earBuzz');
      table.boolean('rotor');
      table.boolean('plaid');
      table.boolean('other');
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
  await knex.schema.dropTable('heads') ;
};
