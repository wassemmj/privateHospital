/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('internal_diseases_and_genetic_disorders',(table)=>{
     table.increments('id').primary();
     table.boolean('HTN');
     table.boolean('DM');
     table.boolean('IHD');
     table.boolean('CKD');
     table.string('other');
     table.date('startTime');
     table.string('drugAllergy');
     table.integer('pastmedicalID').unsigned().notNullable();
     table.foreign('pastmedicalID').references('pastMedicalHistorys.id');
     table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('internal_diseases_and_genetic_disorders');
};
