const express = require("express");

const router = express.Router();

const db = require("../models/index.js");

router.get("/", (req, res) => {
  db.Review.find({ saved: false })
    .sort([["reviewDate", -1]])
    .then(reviewsFound => {
      console.log(reviewsFound);

      const hbsObject = {
        reviews: reviewsFound
      };

      res.render("index", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get("/saved", (req, res) => {
  db.Review.find({ saved: true })
    .sort([["reviewDate", -1]])
    .populate("comments")
    .then(reviewsFound => {
      console.log(reviewsFound);

      const hbsObject = {
        reviews: reviewsFound
      };

      res.render("saved", hbsObject);
    })
    .catch(function(err) {
      res.json(err);
    });
});

module.exports = router;
