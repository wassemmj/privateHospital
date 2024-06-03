/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('vitalSigns',(table)=>{
     table.increments('id').primary();
     table.integer('Bp');
     table.integer('Rr');
     table.integer('bodyTempreture');
     table.integer('heartRate');
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
  await knex.schema.dropTable('vitalSigns');
};
