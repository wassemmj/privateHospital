/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('deathSigns' , (table) => {
      table.increments('id').primary();
      table.string('liverMortiseLocation');
      table.string('liverMortiseImprove');
      table.string('liverMortiseColor');
      table.boolean('liverMortiseRemoved');
      table.string('rigorMortiseLocation');
      table.string('dehydration');
      table.string('lateSigns');
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
  await knex.schema.dropTable('deathSigns') ;
};
