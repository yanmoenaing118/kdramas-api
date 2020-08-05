const Comment = require("./../models/commentModel");
const catchAsync = require("./../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res, next) => {
  let fopts = {};
  if (req.params.dramaId) {
    ftopts = { drama: req.params.dramaId };
  }
  const comments = await Comment.find(fopts).populate({
    path: "user",
    select: "name photo",
  });
  res.status(200).json({
    status: "success",
    data: {
      data: comments,
    },
  });
});
exports.createComment = catchAsync(async (req, res, next) => {
  const newCmt = await Comment.create({
    comment: req.body.comment,
    user: req.user._id,
    drama: req.params.dramaId,
  });
  res.status(201).json({
    status: "success",
    data: {
      data: newCmt,
    },
  });
});
exports.getComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id).populate({
    path: "user",
    select: "name photo",
  });
  console.log(comment);
  res.status(200).json({
    status: "success",
    data: {
      data: comment,
    },
  });
});
exports.updateComment = catchAsync(async (req, res, next) => {
  const updatedCmt = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: updatedCmt,
    },
  });
});
exports.deleteComment = catchAsync(async (req, res, next) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
