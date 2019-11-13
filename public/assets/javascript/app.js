const db = require("../models/index.js");

$(document).ready(() => {
  $(document).on("click", "#searchButton", () => {
    db.dropDatabase();
  });
});