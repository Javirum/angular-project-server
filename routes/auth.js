'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/user');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET me. */
router.get('/me', (req, res, next) => {
  if (req.session.currentUser) {
    res.json(req.session.currentUser);
  } else {
    res.status(404).json({ code: 'not-found' });
  }
});

/* POST login page. */
router.post('/login', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(422).json({ code: 'validation' });
  }

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ code: 'not-found' });
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.json(user);
      } else {
        return res.status(404).json({ code: 'not-found' });
      }
    })
    .catch(next);
});

/* POST signup page. */
router.post('/signup', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }

  const username = req.body.username;
  const password = req.body.password;
  const location = req.body.location;

  if (!username || !password || !location) {
    return res.status(422).json({ code: 'validation' });
  }

  User.findOne({ username }, 'username')
    .then((userExists) => {
      if (userExists) {
        return res.status(422).json({ code: 'username-not-unique' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const newUser = User({
        username,
        password: hashPass,
        location
      });

      return newUser.save()
        .then(() => {
          req.session.currentUser = newUser;
          res.json(newUser);
        });
    })
    .catch(next);
});

/* POST logout page. */
router.post('/logout', (req, res) => {
  req.session.currentUser = null;
  return res.status(204).send();
});

module.exports = router;
