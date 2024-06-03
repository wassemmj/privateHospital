/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('articulationsUnguis',(table)=>{
      table.increments('id').primary();
      table.text('neurological');
      table.boolean('xanthonychia');
      table.boolean('leukonychia');
      table.boolean('punctateLeukonychia');
      table.boolean('capillaryDilation');
      table.boolean('periorbitalCyanosis');
      table.integer('limbsID').unsigned().notNullable();
      table.foreign('limbsID').references('limbs.id');
      table.timestamps(true,true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('articulationsUnguis')
};
