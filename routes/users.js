const express = require("express");
const router = express.Router();
const { uuid } = require('uuidv4');

const users = [
  {
    id: uuid(),
    name: "John",
    email: "john@gmail.com",
  },
  {
    id: uuid(),
    name: "Tracey",
    email: "tracey@gmail.com",
  },
];


router.get("/", (_, res) => {
  res.send("My Express App!");
});

router.get("/users", (_, res) => {
  res.json({ ok: true, users });
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.json({ ok: true, user });
  } else {
    res.json({ ok: false, message: "User not found" });
  }
});

router.post("/addUser", (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    const id = uuid();
    users.push({ id, name, email });
    res.json({ ok: true, users });
  } else {
    res.json({ ok: false, message: "Name and email are required" });
  }
});

router.delete("/deleteUser/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    const index = users.indexOf(user);
    users.splice(index, 1);
    res.json({ ok: true, users });
  } else {
    res.json({ ok: false, message: "User not found" });
  }
});


module.exports = router;