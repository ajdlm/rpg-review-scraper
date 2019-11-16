const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const db = require("../models");

router.post("/api/scrape-new-reviews", function(req, res) {
  db.Review.find({}).then(existingReviews => {
    axios
      .get(
        "https://www.gamespot.com/reviews/?review_filter_type%5Bplatform%5D=all&review_filter_type%5Bgenre%5D=46&review_filter_type%5BtimeFrame%5D=&review_filter_type%5BstartDate%5D=&review_filter_type%5BendDate%5D=&review_filter_type%5BminRating%5D=&review_filter_type%5Btheme%5D=&review_filter_type%5Bregion%5D=&___review_filter_type%5Bpublishers%5D=&___review_filter_type%5Bdevelopers%5D=&review_filter_type%5Bletter%5D=&sort=date"
      )
      .then(response => {
        console.log(existingReviews);
        console.log("Wow");
        const $ = cheerio.load(response.data);

        const newReviews = [];

        $(".media-game").each((i, element) => {
          const title = $(element)
            .find(".media-title")
            .text();
          const URL = $(element)
            .find("a")
            .attr("href");
          const score = $(element)
            .find(".media-well--review-score")
            .find("span")
            .text();
          const summary = $(element)
            .find(".media-deck")
            .text();
          const date = $(element)
            .find(".media-date")
            .attr("datetime");

          let reviewExists = false;

          for (let i = 0; i < existingReviews.length; i++) {
            if (title === existingReviews[i].reviewTitle) {
              reviewExists = true;

              break;
            }
          }

          if (!reviewExists) {
            newReviews.push({
              reviewTitle: title,
              reviewSource: "GameSpot",
              reviewURL: "https://www.gamespot.com" + URL,
              reviewScore: parseFloat(score),
              reviewSummary: summary,
              reviewDate: date.split(" ")[0],
              saved: false
            });
          }
        });

        db.Review.insertMany(newReviews)
          .then(result => res.json(newReviews))
          .catch(err => console.log(err));
      });
  });
});

router.put("/api/delete-unsaved-reviews", (req, res) => {
  db.Review.deleteMany({ saved: false })
    .then(result => res.json(result))
    .catch(err => console.log(err));
});

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
    }
  });
});

router.get("/dropDatabase", (req, res) => {
  mongoose.connection.db.dropDatabase();
});

module.exports = router;
