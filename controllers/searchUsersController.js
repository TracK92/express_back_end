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


//   (GET) searchGithubUsers
// https://api.github.com/search/users
// Parameters: q (search term), page (page number), per_page (results per page)
// Return: an array of users with login name that contains the search term

const searchUsers = async (req, res) => {
  const octokit = new Octokit({
    auth: authToken,
  });

  // get users with parameters q, page, per_page

  const response = await octokit.request("GET /search/users", {
    q: req.query.q,
    page: req.query.page,
    per_page: req.query.per_page,
  });

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// const searchUsers = async (req, res) => {
//   const octokit = new Octokit({
//     auth: authToken,
//   });

//   const response = await octokit.request('GET /search/users?q={owner}+followers:{followers}', {
//     owner: 'TracK92',
//     followers: '>4',
//   });


//   res.status(200).json({
//     success: true,
//     data: response.data,
//   });
// };

module.exports = {
  searchUsers,
};
