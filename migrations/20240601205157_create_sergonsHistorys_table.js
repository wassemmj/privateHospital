/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('sergonsHistorys',(table)=>{
      table.increments('id').primary();
      table.string('sergon');
      table.string('history');
      table.string('tumbers');
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
  await knex.schema.dropTable('sergonsHistorys');
};
