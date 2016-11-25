/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([{
        id: 1,
        username: 'mettacrouse',
        email: 'mettacrouse@gmail.com',
        name: 'metta',
        high_score: 0,
        hashed_password: '$2a$12$FEzd5CFnDnrCt91p.fcrL.r.fAOVR76.9YzGi4f5U6pB01I4HzYYC',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }, {
        id: 2,
        username: 'karlwatson',
        email: 'karlwatson@gmail.com',
        name: 'karl',
        high_score: 0,
        hashed_password: '$2a$12$FEzd5CFnDnrCt91p.fcrL.r.fAOVR76.9YzGi4f5U6pB01I4HzYYC',
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
