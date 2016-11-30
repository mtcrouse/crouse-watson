/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('scores').del()
    .then(() => {
      return knex('scores').insert([{
        id: 1,
        user_id:1,
        score: 50,
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }, {
        id: 2,
        user_id:1,
        score:89,
        created_at: new Date('2016-11-25 16:17:15 UTC'),
        updated_at: new Date('2016-11-25 16:17:15 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores));"
      );
    });
};
