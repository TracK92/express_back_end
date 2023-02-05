const db = require("../firebase.js");
const { uuid } = require("uuidv4");
const { doc, setDoc, getDoc } = require("firebase/firestore");
const accountSid = process.env.TWILIO_ACCOUNT_SID; 
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken); 

/*
 @route: POST /createNewAccessCode
 @desc: Create new access code
 @access: Public
*/
const createNewAccessCode = async (req, res) => {
  const { phoneNumber } = req.body;
  if (phoneNumber) {
    const id = uuid();
    const accessCode = uuid().slice(0, 6);
    // save user to database
    await setDoc(doc(db, "users", phoneNumber), {
      id,
      accessCode,
    });
    // send access code to user
    await client.messages.create({
      from: '+14094075429',
      to: phoneNumber,
      body: `Your access code is ${accessCode}`,
    });
    res.json({ ok: true, accessCode });
  } else {
    res.json({ ok: false, message: "Phone number is required" });
  }
};

/* 
  @route: POST /validateAccessCode
  @desc: Validate access code
  @access: Public
*/
const validateAccessCode = async (req, res) => {
  const { accessCode, phoneNumber } = req.body;
  if (accessCode && phoneNumber) {
    const userRef = doc(db, "users", phoneNumber);
    const user = await getDoc(userRef);

    if (user.exists()) {
      if (user.data().accessCode === accessCode) {
        res.json({ ok: true });
      } else {
        res.json({ ok: false, message: "Access code is invalid" });
      }
    } else {
      res.json({ ok: false, message: "User doesn't exist." });
    }
  } else {
    res.json({
      ok: false,
      message: "Access code and phone number are required",
    });
  }
};

module.exports = {
  createNewAccessCode,
  validateAccessCode,
};
