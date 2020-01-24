const express = require('express');
const db = require('./userDb.js');
const postDb = require('../posts/postDb.js')
const router = express.Router();

router.use(express.json());


router.post('/', validateUser, (req, res) => {
  const userData = req.body;
  db.insert(userData)
    .then(user => {
      res.status(201).json({
        success: true,
        user
      });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "There was an issue creating new user.",
        err
      })
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

  const id = req.params.id;
  const body = req.body;

  postDb.insert({ ...body, user_id: id })
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      res.status(500).json({
        message: "There was an issue creating new post."
      });
    });
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

router.get('/:id/posts', validateUserId, (req, res) => {
  if(req.user) {
    db.getUserPosts(req.params.id)
      .then(posts => {
        if(posts.length > 0) {
          res.status(200).json({
            success: true,
            posts
          });
        } else {
          res.status(200).json({
            success: true,
            message: "This user has no posts."
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "There was an error retrieving this users posts.",
          error: err
        });
      })
  } else {
    console.log("error")
  }
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
  const data = req.body;
  if(!data) {
    res.status(400).json({
      message: "missing user data"
    });
  } else if(!data.name) {
    res.status(400).json({
      message: "missing reuired name field"
    });
  }else {
    next();
  }
}

function validatePost(req, res, next) {
  const data = req.body;
  if(!data) {
    res.status(400).json({
      message: "missing post data"
    });
  } else if(!data.text) {
    res.status(400).json({
      message: "missing required text field"
    });
  } else {
    next();
  }
}

module.exports = router;
