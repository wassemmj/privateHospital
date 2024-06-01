/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('lmsqas',(table)=>{
      table.increments('id').primary();
      table.string('location');
      table.string('severity');
      table.string('movements');
      table.string('quality');
      table.string('association');
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
  await knex.schema.dropTable('lmsqas');
};
