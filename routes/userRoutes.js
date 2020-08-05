const express = require("express");

const router = express.Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

// auth staffs
router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updateMyPassword
);
router.get("/getMe", authController.protect, userController.getMe);
router.patch("/updateMe", authController.protect, userController.updateMe);

//  admin ops
router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );
router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
