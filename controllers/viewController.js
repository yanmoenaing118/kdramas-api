const Drama = require("./../models/dramaModel");
const Comment = require("./../models/commentModel");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("./../utils/appError");

exports.getAllDramas = catchAsync(async (req, res, next) => {
  const dramas = await Drama.find();
  res.status(200).render("allDramas", {
    dramas,
  });
});

exports.getDramaDetails = catchAsync(async (req, res, next) => {
  const drama = await Drama.findOne({ slug: req.params.slug });
  if (!drama) {
    return next(
      new AppError(
        `There is no drama with this ${req.params.slug
          .split("-")
          .join(" ")} name!`,
        404
      )
    );
  }
  const comments = await Comment.find({ drama: drama._id }).populate({
    path: "user",
  });

  res.status(200).render("dramaDetails", {
    drama,
    comments,
  });
});

exports.getLoginForm = (req, res, next) => {
  res.status(200).render("login", {
    title: "Log in Form",
  });
};

exports.getSignupForm = (req, res, next) => {
  res.status(200).render("signup", {
    title: "Log in Form",
  });
};

exports.getMe = catchAsync(async (req, res, next) => {
  const me = await User.findById(req.user._id);
  res.status(200).render("userAccount", {
    user: me,
  });
});
