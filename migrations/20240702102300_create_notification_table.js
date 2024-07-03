/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('notifications' , (table) => {
      table.increments('id').primary();
      table.string('message').notNullable();
      table.date('read_at').nullable();
      table.integer('doctorID').unsigned().notNullable();
      table.foreign('doctorID').references('doctors.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('notifications') ;
};
