/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('visualsChest',(table)=>{
      table.increments('id').primary();
      table.boolean('sideRounded');
      table.boolean('gynecomastia');
      table.boolean('orange_skinnedBreast');
      table.boolean('spiderVeins');
      table.boolean('barrelChest');
      table.boolean('sternalPit');
      table.integer('chestID').unsigned().notNullable();
      table.foreign('chestID').references('chestsExaminations.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down =async function(knex) {
  await knex.schema.dropTable('visualsChest');
};
