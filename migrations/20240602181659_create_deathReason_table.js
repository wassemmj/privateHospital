/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('deathReasons' , (table) => {
    table.increments('id').primary();
    table.string('lastMinute');
    table.string('lastDay');
    table.string('lastYear');
    table.string('reasonLastHour');
    table.boolean('anatomy');
    table.boolean('autopsy');
    table.integer('deathFileID').unsigned().notNullable();
    table.foreign('deathFileID').references('deathFiles.id');
    table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('deathReasons') ;
};
