const express = require("express");

const router = new express.Router();
const commentRouter = require("./../routes/commentRoutes");

const dramaController = require("./../controllers/dramaController");
const authController = require("./../controllers/authController");

router.use("/:dramaId/comments", authController.protect, commentRouter);

router
  .route("/")
  .get(dramaController.getAllDramas)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    dramaController.createDrama
  );

router
  .route("/:id")
  .get(dramaController.getDrama)
  .patch(dramaController.updateDrama)
  .delete(dramaController.deleteDrama);

module.exports = router;

/**
 * /dramaId/comments            get
 * /dramaId/comments            post
 * /dramaId/comments/commentId  get
 * /dramaId/comments/commentId  patch
 * /dramaId/comments/commentId  delete
 */
