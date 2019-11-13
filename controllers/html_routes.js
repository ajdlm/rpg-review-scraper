const express = require("express");
const axios = require("axios");

const router = express.Router();

const db = require("../models");

router.get("/", function(req, res) {
  db.Review.find({})
    .populate("comments")
    .then(function(foundReviews) {
      res.json(foundReviews);
    })
    .catch(function(err) {
      res.json(err);
    });
  //review.getReviews(function(data) {
  //const hbsObject = {
  //reviews: data
  //};

  //     res.render("index", hbsObject);
  res.render("index");
  //});
});

axios
  .get(
    "https://www.gamespot.com/reviews/?review_filter_type%5Bplatform%5D=all&review_filter_type%5Bgenre%5D=46&review_filter_type%5BtimeFrame%5D=&review_filter_type%5BstartDate%5D=&review_filter_type%5BendDate%5D=&review_filter_type%5BminRating%5D=&review_filter_type%5Btheme%5D=&review_filter_type%5Bregion%5D=&___review_filter_type%5Bpublishers%5D=&___review_filter_type%5Bdevelopers%5D=&review_filter_type%5Bletter%5D=&sort=date"
  )
  .then(function(response) {
    const $ = cheerio.load(response.data);

    $(".media-game").each(function(i, element) {
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
      .find("media-date")
      .attr("datetime");

      db.Review.insert({
        reviewTitle: title,
        reviewSource: "GameSpot",
        reviewURL: URL,
        reviewScore: parseFloat(score),
        reviewSummary: summary,
        reviewDate: date
      },
      function(err, inserted) {
        if (err) {
          console.log(err);
        }
        
        else {
          console.log(inserted);
        };
      });
    });
  });

module.exports = router;
