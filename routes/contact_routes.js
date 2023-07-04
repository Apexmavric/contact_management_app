const express = require('express');
const router = express.Router();
const {GetContacts, CreateContact,UpdateContact,GetContact,DeleteContact} = require("../controllers/contact_controllers.js");
const validateToken = require("../middleware/validateToken.js");

router.route("/").get(validateToken,GetContacts).post(validateToken,CreateContact)
router.route("/:id").put(validateToken,UpdateContact).get(validateToken,GetContact).delete(validateToken,DeleteContact)

module.exports = router;