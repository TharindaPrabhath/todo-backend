import express from "express";

const router = express.Router();

const authController = require("../controllers/auth.controller");

router.post("/signup", todoController.addTodo);

module.exports = router;
