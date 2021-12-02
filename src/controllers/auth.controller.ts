import { Request, Response } from "express";

exports.signup = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
};
