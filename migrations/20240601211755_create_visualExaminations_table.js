/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('visualExaminations',(table)=>{
      table.increments('id').primary();
      table.boolean('goodCondition');
      table.boolean('cachecticPatient');
      table.enum('conscience',['Alert_and_Responsive','Mental_Confusion','Unconscious']).defaultTo('Alert_and_Responsive');
      table.integer('gcs');
      table.integer('patientID').unsigned().notNullable();
      table.foreign('patientID').references('patients.id');
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
