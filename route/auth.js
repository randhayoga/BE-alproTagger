const express = require("express");
const router = express.Router();

const authController = require("../controller/auth");
const { authMiddleware } = require("../middleware/auth");

router.post("/registerUser", authController.registerUser);

router.post(
  "/registerAdmin",
  authMiddleware(["admin"]),
  authController.registerAdmin
);

router.post("/loginUser", authController.loginUser);
router.post("/loginAdmin", authController.loginAdmin);

router.get(
  "/profile",
  authMiddleware(["user", "admin"]),
  authController.profile
);

module.exports = router;
