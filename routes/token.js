'use strict';

const boom = require('boom');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
const router = express.Router();

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, _decoded) => {
    if (err) {
      res.verify = false;
    }
    else {
      res.verify = true;
    }

    next();
  });
};

router.get('/token', authorize, (req, res, _next) => {
  res.send(res.verify);
});

router.post('/token', (req, res, next) => {
  const { email, password } = req.body;

  let user;

  knex('users')
    .where('email', email)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(400, 'Bad username or password');
      }

      user = camelizeKeys(row);

      return bcrypt.compare(password, user.hashedPassword);
    })
    .then(() => {
      delete user.hashedPassword;

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      res.cookie('token', token, {
        httpOnly: true,
        secure: router.get('env') === 'production'
      });

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/token', (req, res, _next) => {
  res.clearCookie('token');
  res.status(200);
  res.send('true');
});

module.exports = router;
