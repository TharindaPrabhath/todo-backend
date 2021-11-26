import { Request, Response } from "express";

exports.get404 = (req: Request, res: Response) => {
  res.status(404).json({
    msg: "Not Found",
  });
};
