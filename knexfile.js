'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/platform_game_dev'
  },
  test: {
    client: 'pg',
    connection: 'postgres://localhost/platform_game_test'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
