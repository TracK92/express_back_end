const db = require("../firebase.js");
const { uuid } = require("uuidv4");
const { doc, setDoc, getDoc } = require("firebase/firestore");
const { Octokit } = require("@octokit/core");
const authToken = process.env.GITHUB_TOKEN;
/* 
  @route: GET /searchUsers
  @desc: Search for user profiles
  @access: Public
*/
const searchUsers = async (req, res) => {
  const octokit = new Octokit({
    auth: authToken,
  });

  const response = await octokit.request('GET /search/users?q=tom+repos:%3E42+followers:%3E1000', {});

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

module.exports = {
  searchUsers,
};
