import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  viewTodo,
} from "../controller/todoController";

const router: Router = Router();

router.route("/viewTodo").get(viewTodo);
router.route("/createTodo").post(createTodo);
router.route("/deleteTodo/:todoID").delete(deleteTodo);
router.route("/updateTodo/:todoID").patch(updateTodo);

export default router;
