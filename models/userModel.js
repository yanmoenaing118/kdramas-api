const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Email address is invalid"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [8, "Password must be at least 8 characters or more!"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Confirm your password"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Incorrect passwords",
    },
  },
  photo: {
    type: String,
    default: "default.jpg",
  },
  role: {
    type: String,
    default: "user",
    enum: ["admin", "user"],
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (reqPass) {
  console.log(reqPass, this.password);
  return await bcrypt.compare(reqPass, this.password);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTime = parseInt(this.passwordChangedAt.getTime() / 1000);
    return changedTime > JWTTimestamp;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
