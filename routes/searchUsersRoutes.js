const express = require("express");
const router = express.Router();

const { searchGithubUsers, findGithubUserProfile } = require("../controllers/searchUsersController");



router.get("/searchGithubUsers", searchGithubUsers);
router.get("/findGithubUserProfile", findGithubUserProfile);


module.exports = router;
