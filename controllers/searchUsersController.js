const db = require("../firebase.js");
const { uuid } = require("uuidv4");
const { doc, setDoc, getDoc } = require("firebase/firestore");
const { Octokit } = require("@octokit/core");
/* 
  @route: GET /searchUsers
  @desc: Validate access code
  @access: Public
*/
const searchUsers = async (req, res) => {
 const octokit = new Octokit({
  auth: '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'
})

  const response = await octokit.request('GET /repos/{owner}/',
    {
      owner: 'TracK92',
    }
  )
  
  res.status(200).json({
    success: true,
    data: response.data,
  });
};

module.exports = {
  searchUsers,
};
