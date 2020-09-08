const express = require("express");

const router = new express.Router();

const recommendController = require("./../controllers/RecommendController");

router
  .route("/")
  .get(recommendController.getAllRecommendation)
  .post(recommendController.createRecommendation);

router
  .route("/:id")
  .get(recommendController.getRecommendation)
  .patch(recommendController.updateRecommendation)
  .delete(recommendController.deleteRecommendation);

module.exports = router;
