/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('companionsComplents',(table)=>{
      table.increments('id').primary();
      table.date('timeSituation');
      table.string('catalystRemedies');
      table.string('frequencyImprovment');
      table.string('other');
      table.integer('complentdetailID').unsigned().notNullable();
      table.foreign('complentdetailID').references('complentsDetails.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('companionsComplents');
};
