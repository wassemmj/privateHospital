/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('necksExaminations',(table)=>{
      table.increments('id').primary();
      table.enum('carotidArtery',['listening','testing']);
      table.enum('jugularVein',['pulsation','distention']);
      table.string('lymphNodes');
      table.boolean('neckStiffenss');
      table.boolean('pembertonsSign');
      table.boolean('thyroid_gland_testing');
      table.integer('patientID').unsigned().notNullable();
      table.foreign('patientID').references('patients.id');
      table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('necksExaminations')
};
