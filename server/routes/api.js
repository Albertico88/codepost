const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

const db = "mongodb://alberticograu:920208@ds131512.mlab.com:31512/codeposttest";

// Deals with reprecated mongoose warnings
mongoose.Promise = global.Promise;

mongoose.connect(db, function(err) {
  if (err) {
    console.log('Connetion Error');
  }
});

router.get('/posts', function(req, res) {
  console.log('Requesting Posts');
  post.find({})
      .exec(function(err, posts) {
        if (err) {
          console.log('Error getting Posts');
        } else {
          res.json(posts);
        }
      });
});

router.get('/details/:id', function(req, res) {
  console.log('Requesting post');
  post.findById(req.params.id)
      .exec(function(err, post) {
        if (err) {
          console.log('Error getting the post');
        } else {
          res.json(post);
        }
      });
});

router.get('/post', function(req, res) {
  console.log('Posting a post...');
  var newPost = new post();
  newPost.title = req.body.title;
  newPost.url = req.body.url;
  newPost.description = req.body.description;
  newPost.save(function(err, addedPost) {
    if (err) {
      console.log('Error inserting the post');
    } else {
      res.json(addedPost);
    }
  });

});

module.exports = router;
