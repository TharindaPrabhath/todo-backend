import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import MyRequest from "../types/MyRequest";

const log = require("../logger/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const JWT_SECRET = process.env.JWT_SECRET!;

const isAuth = (req: MyRequest, res: Response, next: NextFunction) => {
  const accessToken = req.get("Authorization")?.split(" ")[1]!;
  let decodedToken: any;

  if (!accessToken) return res.status(401).json({ error: "No Access Token" });

  try {
    decodedToken = jwt.verify(accessToken, JWT_SECRET);
  } catch (err) {
    log.error(err);
    return res.status(500).json({ error: "couldn't decode the access token" });
  }

  if (!decodedToken) return res.status(401).json({ error: "UnAuthenticated" });

  req.userId = decodedToken.userId.toString();
  next();
};

export default isAuth;
