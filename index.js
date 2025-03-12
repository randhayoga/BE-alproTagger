require("dotenv").config();

const express = require("express");
const cors = require("cors");
const route = require("./route");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.static("public"));
app.use("/", route);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}!`);
});
