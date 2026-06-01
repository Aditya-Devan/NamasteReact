const express = require("express");
const authcontroller=require("../controllers/authcontroller");
const router = express.Router();
const authMiddleware=require('../middleware/authMW');

router.post("/signup",authcontroller.signUp);

router.post("/login", authcontroller.login);

router.get(
  "/profile",
  authMiddleware,
  authcontroller.profile
);

module.exports = router;