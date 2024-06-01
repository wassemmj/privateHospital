/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 await knex.schema.createTable('specialists' , (table) => {
   table.increments('id').primary();
   table.string('name').notNullable() ;
   table.integer('floorID').unsigned().notNullable();
   table.foreign('floorID').references('floors.id');
   table.timestamps(true, true);
 }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('specialists') ;
};
