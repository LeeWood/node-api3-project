const express = require('express');
const db = require('./userDb.js');
const router = express.Router();


router.post('/', (req, res) => {
  //do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  db.get(req.query)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was an error retrieving users",
        err
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  db.getById(id)
    .then(user => {
      if(user) {
        req.user = user; //if user exists, setting return value
        next();
      } else {
        res.status(404).json({
          message: "The user with this specific ID does not exist."
        });
        //todo make an error handler for this...
      }
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
