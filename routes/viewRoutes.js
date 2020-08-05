const express = require("express");
const viewController = require("./../controllers/viewController");

const router = express.Router();

router.get("/", viewController.getAllDramas);
router.get("/login", viewController.getLoginForm);
router.get("/signup", viewController.getSignupForm);
router.get("/dramas/:slug", viewController.getDramaDetails);

module.exports = router;
