const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models/index.js");

router.get("/api/get-comments/:id", (req, res) => {
  db.Review.findOne({ _id: req.params.id })
    .populate("comments")
    .then(commentedReview => {
      res.json(commentedReview);
    })
    .catch(err => {
      res.json(err);
    });
});

router.post("/api/post-comment/:id", (req, res) => {
  db.Comment.create(req.body)
    .then(newComment =>
      db.Review.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { comments: newComment._id } }
      )
    )
    .then(updatedReview => {
      res.json(updatedReview);
    })
    .catch(err => {
      res.json(err);
    });
});

router.put("/api/delete-comment/:id", (req, res) => {
  db.Comment.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log("Comment successfully deleted.");
    };
  });
});

router.get("/dropDatabase", (req, res) => {
  mongoose.connection.db.dropDatabase();
});

module.exports = router;
