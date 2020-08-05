const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: {
      data: users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const users = await User.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.updateUser = (req, res) => {
  res.status(403).json({
    message: "Don't use this route to update user",
  });
};

exports.deleteUser = (req, res) => {
  res.status(403).json({
    message: "Don't use this route to delete user",
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const me = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    data: {
      data: me,
    },
  });
});
