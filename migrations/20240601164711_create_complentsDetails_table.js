/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('complentsDetails',(table)=>{
      table.increments('id').primary();
      table.text('story').notNullable();
      table.date('startTime');
      table.string('startSituation');
      table.string('catalyst');
      table.string('remedies');
      table.string('complentsFrequency');
      table.string('complentsImprovment');
      table.integer('clinicalFormID').unsigned().notNullable();
      table.foreign('clinicalFormID').references('clinicalForms.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('complentsDetails');
};
