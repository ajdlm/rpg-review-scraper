const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// If deployed, let Heroku assign a port;
// otherwise, use port 3000
const PORT = process.env.PORT || 8080;

// Require all models
const db = require("./models");

// Initialize Express
const app = express();

// Make public a static folder
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// If deployed, use deployed database;
// otherwise, use local mongoReviews database
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/mongoReviewsDB";

// Connect Mongo database to Mongoose
mongoose.connect(MONGODB_URI);

const hbs = exphbs.create({
  helpers: {
    ifLength: function(value1, value2, options) {
      return value1.length === value2
        ? options.fn(this)
        : options.inverse(this);
    }
  },
  defaultLayout: "main",
  partialsDir: ["views/partials"]
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const dbRoutes = require("./controllers/db_routes.js");
const htmlRoutes = require("./controllers/html_routes.js");

app.use(dbRoutes);
app.use(htmlRoutes);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + ".");
});
