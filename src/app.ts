import express from "express";
import dotenv from "dotenv";
import connectMongo from "./config/mongodb";
import router from "../src/routes/mainRoutes";
import cors from "cors";

dotenv.config();
const app = express();

//express
app.use(cors({origin: "*"}));     
app.set("query parser", "extended");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongo();

//cron job
require('../src/cron/taskDeadlineCron');

//routes
app.use("/", router);

// This is for Handling the joi error
app.use((err: any, req: any, res: any, next: any) => {
  if (err && err.error && err.error.isJoi) {
    return res.status(400).json({
      message: err.error.details[0].message,
      type: "VALIDATION_ERROR",
    });
  }

  return res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
