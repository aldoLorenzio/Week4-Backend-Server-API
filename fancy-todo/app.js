const express = require("express");
// const router = require("./routes")

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;