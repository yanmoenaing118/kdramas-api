const Drama = require("./../models/dramaModel");
const catchAsync = require("./../utils/catchAsync");
const User = require("../models/userModel");

exports.getAllDramas = catchAsync(async (req, res, next) => {
  const dramas = await Drama.find();
  res.status(200).render("allDramas", {
    dramas,
  });
});

exports.getDramaDetails = catchAsync(async (req, res, next) => {
  const drama = await Drama.findOne({ slug: req.params.slug });
  res.status(200).render("dramaDetails", {
    drama,
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
