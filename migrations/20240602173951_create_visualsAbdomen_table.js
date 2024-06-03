/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('visualsAbdomen',(table)=>{
      table.increments('id').primary();
      table.enum('distendedAbdomen',['Smmetrical','UnSmmetrical']);
      table.boolean('Umbilical_Fold_Disappearance');
      table.enum('abdominalRespiration',['Respiration','Shallow_Breathing']);
      table.boolean('hernia');
      table.boolean('sideRounded');
      table.boolean('rashes');
      table.boolean('surgicalScar');
      table.integer('abdomenID').unsigned().notNullable();
      table.foreign('abdomenID').references('abdomenExamination.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('visualsAbdomen');
};
