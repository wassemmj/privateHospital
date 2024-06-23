/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('chestsExaminations',(table)=>{
      table.increments('id').primary();
      table.enum('Compressions',['Silent','hyperresonance']);
      table.enum('respiratorySounds',['Clear_and_Symmetrical','wheezing','Fine_Crackles',' CoarseCrackles']);
      table.integer('clinicalFormID').unsigned().notNullable();
      table.foreign('clinicalFormID').references('clinicalForms.id');
      table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('chestsExaminations');
};
