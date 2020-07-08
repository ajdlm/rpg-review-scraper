const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewTitle: {
        type: String,
        unique: true
    },

    reviewSource: {
        type: String
    },

    reviewURL: {
        type: String,
        unique: true
    },

    reviewScore: {
        type: Number
    },

    reviewSummary: {
        type: String
    },

    reviewDate: {
        type: Date
    },

    saved: {
        type: Boolean
    },

    comments: [
        {
            // Store ObjectIds in the array
            type: Schema.Types.ObjectId,
            // Link the ObjectIds to the ids in the Comment model
            ref: "Comment"
        }
    ]
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;