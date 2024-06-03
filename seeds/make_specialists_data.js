/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('specialists').del()
  await knex('specialists').insert([
    {floorID: 1, name: 'laboratory'} ,
    {floorID: 1, name: 'radiography'} ,
    {floorID: 2, name: 'gastroenterology'} ,
    {floorID: 2, name: 'hematology'} ,
    {floorID: 2, name: 'endocrinology'} ,
    {floorID: 2, name: 'general'} ,
    {floorID: 3, name: 'pulmonology'} ,
    {floorID: 3, name: 'thoracic surgery'} ,
    {floorID: 3, name: 'neurology'} ,
    {floorID: 3, name: 'neurosurgery'} ,
    {floorID: 3, name: 'cardiology'} ,
    {floorID: 3, name: 'cardio-thoracic surgery'} ,
    {floorID: 4, name: 'orthopedic'} ,
    {floorID: 4, name: 'urology'} ,
    {floorID: 4, name: 'psychiatry'} ,
    {floorID: 5, name: 'nephrology'} ,
    {floorID: 5, name: 'ophthalmology'} ,
    {floorID: 5, name: 'dermatology'} ,
    {floorID: 6, name: 'pediatrics'} ,
    {floorID: 6, name: 'otolaryngology'} ,
    {floorID: 6, name: 'ophthalmology'} ,
    {floorID: 7, name: 'intensive care'} ,
    {floorID: 7, name: 'surgical suites'}
  ]);
};
