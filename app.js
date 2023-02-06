const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

var cors = require('cors')

const app = express();
const port = 4000;

app.use(cors()) 

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/", require("./routes/userRoutes"));
app.post("/", (_, res) => {
  res.send("My Express App!");
});

app.use("/", require("./routes/searchUsersRoutes"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
