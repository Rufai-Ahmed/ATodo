import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  updateTodo,
  viewTodo,
} from "../controller/todoController";

const router: Router = Router();

router.route("/viewTodo").get(viewTodo);
/**
 * @swagger
 * /viewTodo:
 *  get:
 *     summary: This is to view all
 *     description: This api don do!!!
 */
router.route("/createTodo").post(createTodo);
/**
 * @swagger
 * /createTodo:
 *  post:
 *    summary: This is to create a new data
 */
router.route("/deleteTodo/:todoID").delete(deleteTodo);
router.route("/updateTodo/:todoID").patch(updateTodo);

export default router;
