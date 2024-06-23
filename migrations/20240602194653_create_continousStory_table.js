/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('continuousStories' , (table) => {
      table.increments('id').primary();
      table.boolean('muscleContusion');
      table.boolean('familyMedicalHistory');
      table.boolean('allergy');
      table.boolean('carrier');
      table.boolean('martialStatus');
      table.boolean('bloodTransfusion');
      table.string('details');
      table.text('summary');
      table.integer('clinicalFormID').unsigned().notNullable();
      table.foreign('clinicalFormID').references('clinicalForms.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('continuousStories') ;
};
