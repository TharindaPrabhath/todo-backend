import { Request, Response } from "express";
import Todo from "../models/todo";
import dayjs from "dayjs";

const log = require("../logger");

exports.getTodos = (req: Request, res: Response) => {
  Todo.find()
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => log.error(err));
};

exports.addTodo = (req: Request, res: Response) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    createdAt: dayjs().format(),
  });
  todo
    .save()
    .then(() => {
      log.info("New Todo was added");
      res.status(200).send("Success");
    })
    .catch((err: any) => {
      log.error(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.updateTodo = (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const createdAt = req.body.createdAt;
  const updatedAt = dayjs().format();
  const isUpdated = true;

  Todo.findById(todoId)
    .then((todo) => {
      // @ts-ignore
      todo?.title = updatedTitle;
      // @ts-ignore
      todo?.description = updatedDescription;
      // @ts-ignore
      todo?.createdAt = createdAt;
      // @ts-ignore
      todo?.updatedAt = updatedAt;
      // @ts-ignore
      todo?.isUpdated = isUpdated;
      todo
        ?.save()
        .then(() => {
          log.info("Todo was updated");
          res.send("Success");
        })
        .catch((err) => {
          log.error(err);
          res.status(500).send("Fail");
        });
    })
    .catch((err) => {
      log.error(err);
      res.send("Could not find the todo");
    });
};

exports.deleteTodo = (req: Request, res: Response) => {
  const todoId = req.params.todoId;
  Todo.findByIdAndDelete(todoId)
    .then(() => {
      log.info("Todo was deleted");
      res.send("Success");
    })
    .catch((err) => {
      log.error(err);
      res.status(500).send("Fail");
    });
};
