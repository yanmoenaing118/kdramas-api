const express = require("express");
const viewController = require("./../controllers/viewController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.use(authController.isLoggedIn);

router.get("/", viewController.getAllDramas);
router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/dramas/:slug", viewController.getDramaDetails);

module.exports = router;
