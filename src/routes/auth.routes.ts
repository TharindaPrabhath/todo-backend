import express from "express";
import { body } from "express-validator";

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("Invalid Email").normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password must have at least 5 characters"),
  ],
  authController.signup
);

router.post("/login", authController.login);

module.exports = router;
