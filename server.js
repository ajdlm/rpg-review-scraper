const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

// If deployed, let Heroku assign a port;
// otherwise, use port 3000
const PORT = process.env.PORT || 3000;

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
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoReviews";

// Connect Mongo database to Mongoose
mongoose.connect(MONGODB_URI);

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");

const htmlRoutes = require("./controllers/html_routes.js");

app.use(htmlRoutes);

// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + ".");
});