const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewController.getAllDramas);
router.get("/dramas", authController.isLoggedIn, viewController.getAllDramas);
router.get("/login", authController.isLoggedIn, viewController.getLoginForm);
router.get("/signup", authController.isLoggedIn, viewController.getSignupForm);
router.get(
  "/dramas/:slug",
  authController.isLoggedIn,
  viewController.getDramaDetails
);
router.get("/me", authController.protect, viewController.getMe);

module.exports = router;
