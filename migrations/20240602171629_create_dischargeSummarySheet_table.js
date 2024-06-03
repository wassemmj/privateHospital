/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('dischargeSummarySheets' , (table) => {
      table.increments('id').primary();
      table.string('specialistDoctor').notNullable();
      table.string('inChargeDoctor').notNullable();
      table.string('final').notNullable();
      table.string('entryReason').notNullable();
      table.string('summaryStory').notNullable();
      table.string('tests');
      table.string('procedures');
      table.string('surgeons');
      table.string('treatments');
      table.enu('finalSituation' ,
          ['complete healing', 'betterment', 'minor improvement', 'remained the same', 'transfer', 'death']
      ).notNullable();
      table.string('guidelines');
      table.integer('patientID').unsigned().notNullable();
      table.foreign('patientID').references('patients.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('dischargeSummarySheets') ;
};
