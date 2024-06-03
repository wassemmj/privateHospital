/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('percussions',(table)=>{
     table.increments('id').primary();
     table.boolean('abdominalRumbling');
     table.boolean('percussiveDullness');
     table.string('in');
     table.string('liverSpan');
     table.boolean('shiftingDullness');
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
  await knex.schema.dropTable('percussions');
};
