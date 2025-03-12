const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/registerUser", authController.registerUser);

router.post("/loginUser", authController.loginUser);

router.patch(
  "/changePassword",
  authMiddleware(["user", "admin"]),
  authController.changePassword
);

router.get(
  "/profile",
  authMiddleware(["user", "admin"]),
  authController.profile
);

module.exports = router;
