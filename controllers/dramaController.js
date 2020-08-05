const Drama = require("./../models/dramaModel");
const catchAsync = require("./../utils/catchAsync");
const ApiFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.getAllDramas = catchAsync(async (req, res, next) => {
  // console.log( req.user );
  const features = new ApiFeatures(Drama.find({}), req.query, Drama);
  features.filter();
  features.sort();
  features.limit();
  features.paginate();

  // execute the query
  const dramas = await features.query.populate("comments");

  res.status(200).json({
    status: "success",
    result: dramas.length,
    data: {
      data: dramas,
    },
  });
});

exports.createDrama = catchAsync(async (req, res, next) => {
  const newDrama = await Drama.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newDrama,
    },
  });
});

exports.getDrama = catchAsync(async (req, res, next) => {
  const drama = await Drama.findById(req.params.id);
  if (!drama) {
    return next(new AppError("No drama found with this id", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: drama,
    },
  });
});

exports.updateDrama = catchAsync(async (req, res, next) => {
  const updatedDrama = await Drama.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedDrama) {
    return next(new Error("No document found with this id"));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: updatedDrama,
    },
  });
});

exports.deleteDrama = catchAsync(async (req, res, next) => {
  const drama = await Drama.findByIdAndDelete(req.params.id);
  if (!drama) {
    return next(new AppError("The drama doesn't exist", 404));
  }
  res.status(204).json({});
});
