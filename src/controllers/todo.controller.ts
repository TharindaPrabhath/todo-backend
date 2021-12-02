import { Response } from "express";
import MyRequest from "../types/MyRequest";
import Todo from "../models/todo";

const log = require("../logger");

exports.getTodos = (req: MyRequest, res: Response) => {
  Todo.find({ user: req.userId })
    .then((todos) => {
      res.json(todos);
    })
    .catch((err) => log.error(err));
};

exports.addTodo = (req: MyRequest, res: Response) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    isUpdated: false,
    user: req.userId,
  });
  todo
    .save()
    .then((insertedTodo: any) => {
      log.info("New Todo was added");
      res.status(200).json(insertedTodo._doc);
    })
    .catch((err: any) => {
      log.error(err);
      res.status(500).send("Internal Server Error");
    });
};

exports.updateTodo = (req: MyRequest, res: Response) => {
  const todoId = req.params.todoId;
  const updatedTitle = req.body.title;
  const updatedDescription = req.body.description;
  const isUpdated = true;

  Todo.findById(todoId)
    .then((todo) => {
      // checking if the request came from the original owner of the todo
      if (todo?.user !== req.userId)
        return res.status(403).json({ error: "UnAuthorized" });

      // @ts-ignore
      todo?.title = updatedTitle;
      // @ts-ignore
      todo?.description = updatedDescription;
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

exports.deleteTodo = (req: MyRequest, res: Response) => {
  const todoId = req.params.todoId;

  Todo.findById(todoId)
    .then((todo) => {
      // checking if the request came from the original owner of the todo
      if (todo?.user !== req.userId)
        return res.status(403).json({ error: "UnAuthorized" });

      // delete the todo
      todo.delete();
    })
    .catch((err) => {
      log.error(err);
      res.status(500);
    });

  // Todo.findByIdAndDelete(todoId)
  //   .then(() => {
  //     log.info("Todo was deleted");
  //     res.send("Success");
  //   })
  //   .catch((err) => {
  //     log.error(err);
  //     res.status(500).send("Fail");
  //   });
};
