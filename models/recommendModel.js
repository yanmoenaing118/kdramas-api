const mongoose = require("mongoose");

const recommendSchema = mongoose.Schema({
  stars: {
    type: Number,
    default: 0,
  },

  happyEnding: {
    type: Boolean,
    required: [true, "Let me know that the drama has happy ending"],
  },

  drama: {
    type: String,
    required: [true, "A recommendation must contain the name of the drama"],
  },
});

const Recommendation = mongoose.model("Recommendation", recommendSchema);

module.exports = Recommendation;
