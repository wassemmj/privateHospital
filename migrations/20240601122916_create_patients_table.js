/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('patients', (table)=>{
        table.increments('id').primary();
        table.string('fullName').notNullable();
        table.string('phoneNumber').notNullable();
        table.string('fatherName').notNullable();
        table.string('motherName').notNullable();
        table.string('internationalNumber').notNullable();
        table.string('currentLocation').notNullable();
        table.date('birthdate').notNullable();
        table.boolean('gender').notNullable();
        table.string('work').notNullable();
        table.string('socialStatus').notNullable();
        table.integer('roomID').unsigned().notNullable();
        table.foreign('roomID').references('rooms.id');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('patients')
};
