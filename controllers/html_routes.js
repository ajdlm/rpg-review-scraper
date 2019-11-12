const express = require("express");

const router = express.Router();

const review = require("../models/Review.js");
const comment = require("../models/Comment.js");

router.get("/", function(req, res) {
  //review.getReviews(function(data) {
         //const hbsObject = {
           //reviews: data
         //};

    //     res.render("index", hbsObject);
    res.render("index");
  //});
});

module.exports = router;