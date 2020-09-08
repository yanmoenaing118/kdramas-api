const Recommendation = require("./../models/recommendModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllRecommendation = catchAsync(async (req, res, next) => {
  const recommendations = await Recommendation.find();
  res.status(200).json({
    status: "success",
    data: {
      data: recommendations,
    },
  });
});

exports.getRecommendation = catchAsync(async (req, res, next) => {
  const recommendation = await Recommendation.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data: recommendation,
    },
  });
});

exports.createRecommendation = catchAsync(async (req, res, next) => {
  const newRecommendation = await Recommendation.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      data: newRecommendation,
    },
  });
});

exports.updateRecommendation = catchAsync(async (req, res, next) => {
  const recommendation = await Recommendation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: "success",
    data: {
      data: recommendation,
    },
  });
});

exports.deleteRecommendation = catchAsync(async (req, res, next) => {
  await Recommendation.findByIdAndDelete(req.params.id);
  res.status(400).json({});
});
