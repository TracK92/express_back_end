const express = require("express");
const router = express.Router();

const { createNewAccessCode, validateAccessCode } = require("../controllers/userController");

// (POST) CreateNewAccessCode
// Parameters: phoneNumber
// Return: a random 6-digit access code
// Other requirement: save this access code to the phoneNumber in the database

// (POST) ValidateAccessCode
// Parameters: accessCode, phoneNumber
// Return: { success: true }
// Other requirement: set the access code to empty string once validation is complete

// const accessCodes = [
//   {
//     id: "dc54e274-b781-46d6-892d-b5afe895fa0c",
//     phoneNumber: "12344567",
//     accessCode: "ec6489",
//   },
// ];

// router.get("/accessCodes", (_, res) => {
//   res.json({ ok: true, accessCodes });
// });

router.post("/createNewAccessCode", createNewAccessCode);

router.post("/validateAccessCode", validateAccessCode);

module.exports = router;
