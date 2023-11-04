import { Request, Response } from "express";
import { statusCode } from "../utils/statusCode";
import todoModel, { iTodo } from "../model/todoModel";
import moment from "moment";

export const createTodo = async (req: Request, res: Response) => {
  const { task, time } = req.body;
  const deadline = moment(time).format("LLLL");

  const todo: iTodo = await todoModel.create({ task, deadline });

  const timer = setTimeout(async () => {
    await todoModel.findByIdAndUpdate(
      { _id: todo._id },
      { timeAchieved: true },
      { new: true }
    );

    clearTimeout(timer);
  }, time);
  res.status(statusCode.CREATED).json({
    message: "Created",
    data: todo,
  });
};

export const viewTodo = async (req: Request, res: Response) => {
  const todo = await todoModel.find().sort({ createdAt: -1 });

  res.status(statusCode.OK).json({
    message: "Data gotten",
    data: todo,
  });
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;
    const checker = await todoModel.findById(todoID);

    if (checker?.done === "start") {
      const todo = await todoModel.findByIdAndUpdate(
        { _id: todoID },
        { done: "ongoing" },
        { new: true }
      );
      res.status(statusCode.OK).json({
        message: "Updated",
        data: todo,
      });
    } else if (checker?.done === "ongoing") {
      const todo = await todoModel.findByIdAndUpdate(
        { _id: todoID },
        {
          done: "finished",
          deadline: moment(new Date().getTime()).format("LLLL"),
        },
        { new: true }
      );
      res.status(statusCode.OK).json({
        message: "Updated",
        data: todo,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { todoID } = req.params;
    const checker = await todoModel.findByIdAndDelete(todoID);

    res.status(statusCode.OK).json({
      message: "Deleted",

      checker,
    });
  } catch (err) {
    console.log(err);
  }
};
