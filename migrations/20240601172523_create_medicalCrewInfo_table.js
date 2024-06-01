/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('medicalCrewInfos' , (table) => {
      table.increments('id').primary();
      table.string('surgeonName').notNullable();
      table.string('helperSurgeonName').notNullable();
      table.string('nurseName').notNullable();
      table.integer('surgeonRoomNumber').notNullable();
      table.string('surgeryName').notNullable();
      table.string('helperNurse').notNullable();
      table.integer('surgeryFileID').unsigned().notNullable();
      table.foreign('surgeryFileID').references('surgeryFiles.id');
      table.timestamps(true, true);
  }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('medicalCrewInfos') ;
};
