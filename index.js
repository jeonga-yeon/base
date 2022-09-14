require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const bodyParser = require("body-parser");
const { User } = require("./models/User");

const config = require("./config/key");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const mongoose = require("mongoose");

mongoose
  .connect(config.mongoURI)
  .then(() => console.log("mongoDB connected..."))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
