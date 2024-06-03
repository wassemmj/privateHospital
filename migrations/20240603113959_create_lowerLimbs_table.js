/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('lowerLimps',(table)=>{
      table.increments('id').primary();
      table.boolean('inguinal_Lymphadenopathy_Palpation');
      table.boolean('Venous_Leg_Ulcers');
      table.enum('oedema_Assessment',['type1','type2','type3','type4']);
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
  await knex.schema.dropTable('lowerLimps');
};
