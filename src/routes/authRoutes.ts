import express from "express"
import { createValidator } from "express-joi-validation";
import authSchema from "../validations/authValidation";
import authController from "../controllers/authController";

const validator = createValidator({passError: true});
const auth = express.Router();

auth.post(
  "/register",
  validator.body(authSchema.register),
  authController.registerUser
);

auth.post(
  "/login",
  validator.body(authSchema.loginSchema),
  authController.loginUser
);

export default auth;

