/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('skins',(table)=>{
      table.increments('id').primary();
      table.enum('color',['Paleskin','Soil_Color','Xanthoderma_Skin']);
      table.enum('natural',['Xerosis','Bright','Clammyskin']);
      table.enum('other',['Freckled','Petechial','ButterflyRash']);
      table.enum('hair',['Hypertrichosis','Madarosis']);
      table.integer('headsExaminationsID').unsigned().notNullable();
      table.foreign('headsExaminationsID').references('headsExaminations.id');
      table.timestamps(true,true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('skins');
};
