/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('manus',(table)=>{
      table.increments('id').primary();
      table.boolean('palmarErythema');
      table.boolean('purpura');
      table.boolean('acrocyanosis');
      table.boolean('myatrophy');
      table.integer('limbsID').unsigned().notNullable();
      table.foreign('limbsID').references('limbs.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('manus');
};
