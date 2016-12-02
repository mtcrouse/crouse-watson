/* eslint camelcase: 0, max-len: 0 */

'use strict';

exports.seed = function(knex) {
  return knex('friends').del()
    .then(() => {
      return knex('friends').insert([{
        id: 1,
        user_id:1,
        friend_id:2,
        created_at: new Date('2016-11-25 16:17:12 UTC'),
        updated_at: new Date('2016-11-25 16:17:12 UTC')
      }, {
        id: 2,
        user_id:2,
        friend_id:1,
        created_at: new Date('2016-11-25 16:17:15 UTC'),
        updated_at: new Date('2016-11-25 16:17:15 UTC')
      }]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('friends_id_seq', (SELECT MAX(id) FROM friends));"
      );
    });
};
