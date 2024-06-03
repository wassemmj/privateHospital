/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('nonSpecialists').del()
    await knex('nonSpecialists').insert([
        {name: 'Secretary'},
        {name: 'Receptionist'},
        {name: 'Boss'},
        {name: 'accountant'},
    ]);
};
