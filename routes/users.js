'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const ev = require('express-validation');
const validations = require('../validations/users');

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

router.get('/users/friends', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('friends')
    .where('user_id', userId)
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No user at id ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/users/currentuser', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('users')
    .where('id', userId)
    .first()
    .then((row) => {
      if (!row) {
        return next(boom.create(400, `No user at id ${userId}`));
      }
      res.send(camelizeKeys(row));
    })
    .catch((err) => {
      next(err);
    });
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

router.patch('/users', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { newHighScore } = req.body;

  knex('users')
    .where('id', userId)
    .first()
    .then((user) => {
      if (!user) {
        return next(boom.create(404, 'Not Found'));
      }

      const highScore = user.high_score;
      const updateUser = {};

      if (newHighScore > highScore) {
        updateUser.highScore = newHighScore;

        return knex('users')
          .update(decamelizeKeys(updateUser))
          .where('id', userId);
      }

      return knex('users')
        .update(decamelizeKeys(updateUser))
        .where('id', userId);
    })
    .then((row) => {
      const user = camelizeKeys(row[0]);

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/users', ev(validations.post), (req, res, next) => {
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

module.exports = router;
