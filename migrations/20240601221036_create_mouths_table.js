/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('mouths',(table)=>{
      table.increments('id').primary();
      table.boolean('atrophicGlossitis');
      table.boolean('macroglossia');
      table.enum('color',['White','Black']);
      table.boolean('toothDecay');
      table.boolean('Macrogingivae');
      table.boolean('gingivalBleeding');
      table.boolean('Ulcers');
      table.integer('headsExaminationsID').unsigned().notNullable();
      table.foreign('headsExaminationsID').references('headsExaminations.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('mouths');
};
