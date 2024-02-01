const express = require("express");
const morgan = require("morgan");
const router = require("./routes/todoRouter");
const dotenv = require("dotenv").config({ path: "./config.env" });

//MIDDLEWARES

const app = express();
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/todos", router);
// app.use("/api/v1/user");
module.exports = app;
