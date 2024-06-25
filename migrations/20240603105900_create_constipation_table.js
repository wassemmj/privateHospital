/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('constipations' , (table) => {
      table.increments('id').primary();
      table.string('frequency');
      table.string('color');
      table.string('pain');
      table.string('mandatory');
      table.string('zahir');
      table.string('lmsqa');
      table.integer('abdomenAreaID').unsigned().notNullable();
      table.foreign('abdomenAreaID').references('abdomenAreas.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('constipations') ;
};
