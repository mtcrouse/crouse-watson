'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys } = require('humps');

// eslint-disable-next-line new-cap
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

router.get('/scores', (req, res, next) => {
  knex('scores')
    .orderBy('id')
    .then((rows) => {
      const scores = camelizeKeys(rows);

      res.send(scores);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/scores/users', authorize, (req, res, next) => {
  const { userId } = req.token;

  knex('scores')
    .where('user_id', userId)
    .then((rows) => {
      const scores = camelizeKeys(rows);

      res.send(scores);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/scores', authorize, (req, res, next) => {
  const { userId } = req.token;
  const { currentScores } = req.body;

  for (const score of currentScores) {
    knex('scores')
      .insert({ user_id: userId, score: Number(score) }, '*')
      .catch((err) => {
        next(err);
      });
  }
  res.send('Scores succesfully posted');
});

module.exports = router;
