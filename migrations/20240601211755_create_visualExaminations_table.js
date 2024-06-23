/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('visualExaminations',(table)=>{
      table.increments('id').primary();
      table.boolean('goodCondition');
      table.boolean('cachecticPatient');
      table.enum('conscience',['Alert_and_Responsive','Mental_Confusion','Unconscious']);
      table.integer('gcs');
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
  await knex.schema.dropTable('visualExaminations');
};
