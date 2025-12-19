import express from "express";
import auth from "./authRoutes";
import task from "./taskRoutes";

const app = express.Router();

app.get("/", function (req: any, res: any, next: any) {
  res.send("Welcome to Task App");
});

// for auth apis
app.use(`/`, auth)

// for task apis
app.use(`/`, task);

export = app;
