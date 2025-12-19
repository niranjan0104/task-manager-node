import express from "express"
import { createValidator } from "express-joi-validation";
import taskSchema from "../validations/taskValidation";
import taskController from "../controllers/taskContoller";
import AuthMiddleware from "../middleware/authMiddleware";
 
const validator = createValidator({passError: true});
const task = express.Router();

task.post(
  "/tasks",
  AuthMiddleware(),
  validator.body(taskSchema.task),
  taskController.createTask
);

task.get(
  "/tasks",
  AuthMiddleware(),
  validator.query(taskSchema.taskfilter),
  taskController.getTask
);

task.put(
  "/tasks/:taskId",
  AuthMiddleware(),
  validator.params(taskSchema.taskUpdateParmas),
  validator.body(taskSchema.taskUpdateBody),
  taskController.updateTask
);

task.delete(
  "/tasks/:taskId",
  AuthMiddleware(),
  validator.params(taskSchema.taskDeleteParmas),
  taskController.deleteTask
);

export default task;


