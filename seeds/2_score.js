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
      },
      {
        id: 2,
        user_id:1,
        score: 60,
        created_at: new Date('2016-11-26 16:17:12 UTC'),
        updated_at: new Date('2016-11-26 16:17:12 UTC')
      },{
        id: 3,
        user_id:2,
        score: 50,
        created_at: new Date('2016-11-26 16:17:12 UTC'),
        updated_at: new Date('2016-11-26 16:17:12 UTC')
      },{
        id: 4,
        user_id:2,
        score: 70,
        created_at: new Date('2016-11-27 16:17:12 UTC'),
        updated_at: new Date('2016-11-27 16:17:12 UTC')
      },{
        id: 5,
        user_id:2,
        score: 50,
        created_at: new Date('2016-11-28 16:17:12 UTC'),
        updated_at: new Date('2016-11-28 16:17:12 UTC')
      },{
        id: 6,
        user_id:1,
        score: 60,
        created_at: new Date('2016-11-29 16:17:12 UTC'),
        updated_at: new Date('2016-11-29 16:17:12 UTC')
      },{
        id: 7,
        user_id:2,
        score:100,
        created_at: new Date('2016-11-29 16:17:15 UTC'),
        updated_at: new Date('2016-11-29 16:17:15 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('scores_id_seq', (SELECT MAX(id) FROM scores));"
      );
    });
};
