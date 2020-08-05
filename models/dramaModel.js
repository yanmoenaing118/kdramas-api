const mongoose = require("mongoose");
const slugify = require("slugify");

const dramaSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A dramas show must have a title."],
      unique: [
        true,
        "Drama name already exists. Try adding extra infomation to the same title, such as released year or country",
      ],
      trim: true,
    },

    director: {
      type: String,
      required: [true, "A dramas show must have a director"],
      trim: true,
    },

    scriptWriter: {
      type: String,
      required: [true, "A drama must have a writter"],
    },

    leadActor: {
      type: String,
      required: [true, "A dramas show must have a lead actor"],
      trim: true,
    },

    leadActress: {
      type: String,
      required: [true, "A dramas show must have a lead actress"],
      trim: true,
    },
    noepisodes: Number,
    releasedYear: {
      type: Date,
      required: [true, "A drama show must have released year"],
    },
    firstReleasedDate: Date,
    finalReleasedDate: Date,

    countryOfOrigin: {
      type: String,
      required: [true, "Provide the original country of the drama"],
      trim: true,
    },
    imdbRating: Number,
    slug: String,
    poster: {
      type: String,
      required: [true, "A poster is required for a drama"],
    },
    images: [String],
    synopsis: {
      type: String,
      required: [true, "A drama must have a synopsis about it!"],
    },
    distributor: {
      type: String,
      required: [true, "A drama must have a distributor"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

dramaSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "drama",
  localField: "_id",
});

dramaSchema.pre("save", function (next) {
  this.slug = slugify(this.title);
  next();
});

const Drama = mongoose.model("Drama", dramaSchema);

module.exports = Drama;
