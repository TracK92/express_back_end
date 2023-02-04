const express = require("express");
const router = express.Router();
const { uuid } = require("uuidv4");

// (POST) CreateNewAccessCode
// Parameters: phoneNumber
// Return: a random 6-digit access code
// Other requirement: save this access code to the phoneNumber in the database

// (POST) ValidateAccessCode
// Parameters: accessCode, phoneNumber
// Return: { success: true }
// Other requirement: set the access code to empty string once validation is complete

const accessCodes = [
  {
    id: "dc54e274-b781-46d6-892d-b5afe895fa0c",
    phoneNumber: "12344567",
    accessCode: "ec6489",
  },
];

router.get("/accessCodes", (_, res) => {
  res.json({ ok: true, accessCodes });
});

router.post("/createNewAccessCode", (req, res) => {
  const { phoneNumber } = req.body;
  if (phoneNumber) {
    const id = uuid();
    const accessCode = uuid().slice(0, 6);
    accessCodes.push({ id, phoneNumber, accessCode });
    res.json({ ok: true, accessCode });
  } else {
    res.json({ ok: false, message: "Phone number is required" });
  }
});

router.post("/validateAccessCode", (req, res) => {
  const { accessCode, phoneNumber } = req.body;
  if (accessCode && phoneNumber) {
    const code = accessCodes.find(
      (code) =>
        code.accessCode === accessCode && code.phoneNumber === phoneNumber
    );
    if (code) {
      res.json({ ok: true, success: true });
    } else {
      res.json({ ok: false, message: "Access code is invalid" });
    }
  } else {
    res.json({
      ok: false,
      message: "Access code and phone number are required",
    });
  }
});

module.exports = router;
