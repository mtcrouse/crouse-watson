'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.verify = false;

      return next(boom.create(401, 'Unauthorized'));
    }

    res.verify = true;
    req.token = decoded;

    next();
  });
};

router.get('/users', authorize, (req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((rows) => {
      const users = camelizeKeys(rows);

      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/id', authorize, (req, res, next) => {
  let { userId } = req.token;

  userId = JSON.stringify(userId);

  res.send(userId);
});

router.get('/users/:id', authorize, (req, res, next) => {
  const { id } = req.params;

  knex('users')
    .where('id', id)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No user at id ${id}`));
      }

      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

router.patch('/users', (req, res, next) => {
  const { highScore } = req.body;
});

router.post('/users', (req, res, next) => {
  const { username, email, password, name } = req.body;

  bcrypt.hash(password, 12)
    .then((hashedPassword) => {
      const insertUser = { username, email, hashedPassword, name };

      return knex('users')
        .where('email', email)
        .first()
        .then((row) => {
          if (row) {
            return next(boom.create(400, 'Email already exists'));
          }
        })
        .then(() => {
          return knex('users').insert(decamelizeKeys(insertUser), '*');
        });
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/users', (req, res, next) => {
  const { userId } = req.token;
  let user;

  const { username } = req.body;

  knex('users')
    .where('username', username)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(404, `User not found at id ${username}`));
      }

      if (userId !== Number(row.user_id)) {
        return next(boom.create(400, `userId ${userId} and row.user_id ${row.user_id} fail strictly equal.`));
      }

      user = camelizeKeys(row);

      return knex('users')
        .del()
        .where('username', username);
    })
    .then(() => {
      delete user.id;
      delete user.hashedPassword;
      delete user.updatedAt;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
