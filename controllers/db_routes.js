const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const db = require("../models/index.js");

router.get("/dropDatabase", function(req, res) {
    mongoose.connection.db.dropDatabase()
});

module.exports = router;