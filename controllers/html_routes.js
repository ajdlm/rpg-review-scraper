const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

const db = require("../models/index.js");

router.get("/", function(req, res) {
  axios
    .get(
      "https://www.gamespot.com/reviews/?review_filter_type%5Bplatform%5D=all&review_filter_type%5Bgenre%5D=46&review_filter_type%5BtimeFrame%5D=&review_filter_type%5BstartDate%5D=&review_filter_type%5BendDate%5D=&review_filter_type%5BminRating%5D=&review_filter_type%5Btheme%5D=&review_filter_type%5Bregion%5D=&___review_filter_type%5Bpublishers%5D=&___review_filter_type%5Bdevelopers%5D=&review_filter_type%5Bletter%5D=&sort=date"
    )
    .then(response => {
      const $ = cheerio.load(response.data);

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

        db.Review.create(
          {
            reviewTitle: title,
            reviewSource: "GameSpot",
            reviewURL: "https://www.gamespot.com" + URL,
            reviewScore: parseFloat(score),
            reviewSummary: summary,
            reviewDate: date.split(" ")[0]
          },
          (err, inserted) => {
            if (err) {
              console.log(err);
            } else {
              console.log(inserted);
            }
          }
        );
      });
    })
    .then(() => {
      db.Review.find()
        .sort({ reviewDate: -1 })
        .populate("comments")
        .then(function(reviewsFound) {
          res.render("index", {
            reviews: reviewsFound
          });
        })
        .catch(function(err) {
          res.json(err);
        });
    });
});

module.exports = router;
