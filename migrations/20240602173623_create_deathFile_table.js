/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('deathFiles', (table) => {
        table.increments('id').primary();
        table.string('identityStatus').notNullable();
        table.string('temperature').notNullable();
        table.string('deathLocation').notNullable();
        table.date('deathDate').notNullable();
        table.time('deathHour').notNullable();
        table.string('doctorName').notNullable();
        table.date('fileDate').notNullable();
        table.enu('deathSeen',
            ['pronounced dead by the doctor' , 'Attested death' , 'unWitnessed death'])
            .notNullable();
        table.integer('patientID').unsigned().notNullable();
        table.foreign('patientID').references('patients.id');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTable('deathFiles');
};
