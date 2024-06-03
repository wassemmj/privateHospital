/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('palpations',(table)=>{
      table.increments('id').primary();
      table.boolean('macBrownie');
      table.boolean('murphy');
      table.boolean('rooftopping');
      table.enum('milia',['Right','Left']);
      table.enum('myoclonus',['Up','Middel']);
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
  await knex.schema.dropTable('palpations');
};
