const express = require("express");
const { RegisterUser, LoginUser, CurrentUser } = require("../controllers/Users_controllers");
const validatetoken = require("../middleware/validateToken");

const router = express.Router();

router.post("/register",RegisterUser);
router.post("/login",LoginUser);
router.get("/current",validatetoken,CurrentUser);

module.exports = router; 