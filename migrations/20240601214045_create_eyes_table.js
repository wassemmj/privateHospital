/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('eyes',(table)=>{
      table.increments('id').primary();
      table.boolean('pallor');
      table.boolean('jaundice');
      table.boolean('Nystagmus');
      table.boolean('Enophthalmos');
      table.boolean('Exophthalmos');
      table.integer('headsExaminationsID').unsigned().notNullable();
      table.foreign('headsExaminationsID').references('headsExaminations.id');
      table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('eyes');
};
