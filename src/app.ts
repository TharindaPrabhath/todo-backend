import { Request, Response } from "express";

const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

// mongodb connection
//const connect = require("./db/connect").connect;

const log = require("./logger");

// routes
const todoRoutes = require("./routes/todo.routes");

// controllers
const errorController = require("./controllers/error.controller");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// if the server was started in dev mode, then the below code block will execute
// and load values from .env file
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const PORT = process.env.PORT;

// Todo routes
app.use("/api", todoRoutes);

// Not found 404
app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://tharinda:hycdJRCvE7Yhuvn@cluster0.ich0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then((res: any) => {
    log.info("Connected to mongodb");
    app.listen(PORT, () => {
      log.info(`Server started on port:  ${PORT}`);
    });
  })
  .catch((err: any) => {
    log.error(err);
  });
