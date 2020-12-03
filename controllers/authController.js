const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const createTokenAndSend = (res, user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRETE_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  res.status(201).json({
    status: "success",
    token,
    data: {
      data: user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createTokenAndSend(res, newUser);
});

exports.login = catchAsync(async (req, res, next) => {

  // check if email and password are provided
  if (!req.body.email || !req.body.password) {
    return next(new AppError("Email and password are required!", 500));
  }
  // check if the user exists and correct password
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // the user exists and password is correct
  if (!user || !(await user.correctPassword(req.body.password))) {
    return next(new AppError("The email and password are incorrect!", 400));
  }
  createTokenAndSend(res, user);
});

exports.protect = catchAsync(async (req, res, next) => {
  // check if the authorization header is present
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];

  }

  if (!token) {
    return next(new AppError("You are not logged in. Please log in!", 401));
  }
  // verify the token with secrete key
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRETE_KEY
  );
  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new AppError("The user belonging to this token doesn't exist.", 404)
    );
  }

  // check if user changed password after the token has been issued
  if (user.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        "This user has recently changed the password. Log in again to access",
        401
      )
    );
  }

  req.user = user;
  res.locals.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to access this content!", 403)
      );
    }
    next();
  };
};

exports.updateMyPassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.correctPassword(req.body.currentPassword))) {
    return next(new AppError("Your current password is incorrect!", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.password;
  await user.save();
  createTokenAndSend(res, user);
});

exports.isLoggedIn = async (req, res, next) => {
  // check if the authorization header is present
  let token;

  if (req.headers.cookie) {
    token = req.headers.cookie.split("=")[1];
  }

  if (!token) {
    return next();
  }
  // verify the token with secrete key
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRETE_KEY);
  } catch (error) {
    next();
  }
  const user = await User.findById(decoded.id);

  if (!user) {
    return next();
  }
  req.user = user;

  res.locals.user = user;

  next();
};

exports.logout = (req, res, next) => {
  res.cookie("jwt", "logout", {
    expires: new Date(Date.now() + 10 * 60 * 1000),
  });
  res.status(200).json({
    status: "success",
    message: "The user has logged out",
  });
};
