const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, "A comment cannot be empty!"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "A comment must belong to a user!"],
    },
    drama: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Drama",
      required: [true, "A comment must belong to a drama"],
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
