/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('intensiveCares',(table)=>{
     table.increments('id').primary();
     table.integer('RoomID').notNullable();
     table.string('ptInitial').notNullable();
     table.string('POA').notNullable();
     table.string('code').notNullable();
     table.string('HT').notNullable();
     table.string('WT').notNullable();
     table.string('isolation').notNullable();
     table.boolean('accucheck').notNullable();
     table.boolean('restraints').notNullable();
     table.date('admitDate').notNullable();
     table.string('meds').notNullable();
     table.string('RN').notNullable();
     table.string('Instructor').notNullable();
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
  await knex.schema.dropTable('intensiveCares');
};
