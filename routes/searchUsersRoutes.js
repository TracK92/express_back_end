const express = require("express");
const router = express.Router();

const { searchUsers } = require("../controllers/searchUsersController");



router.get("/searchUsers", searchUsers);

module.exports = router;
