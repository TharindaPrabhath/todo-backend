import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import User from "../models/user";
import jwt from "jsonwebtoken";

const log = require("../logger/index");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // const error = new Error();
    // error.message = "Validation Failed";
    // throw error;
    return res.json({ errors: errors.array() });
  }

  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // make sure that the email is already existing or not
  User.findOne({ email: email })
    .then((u) => {
      if (u) return res.status(422).json({ error: "Email already exists" });

      // validating the password & confirm password
      if (password !== confirmPassword)
        return res.status(422).json({ error: "Passwords does not match" });

      // hashing the password
      bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          // create new user
          const user = new User({
            email: email,
            password: hashedPassword,
          });

          // saving the user in db
          user
            .save()
            .then((savedUser: any) => {
              return res.status(201).json(savedUser._doc);
            })
            .catch((e) => {
              log.error(e);
              return res.status(500).json({ error: "couldn't save to the db" });
            });
        })
        .catch((e) => {
          log.error(e);
          return res.status(500);
        });
    })
    .catch((e) => {
      log.error(e);
      return res.status(500);
    });
};

exports.login = (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  // find the user from the db
  User.findOne({ email: email })
    .then((u) => {
      if (!u) return res.status(401).json({ error: "couldn't find the user" });

      bcrypt.compare(password, u!.password).then((isEqual) => {
        if (!isEqual)
          return res.status(401).json({ error: "invalid email or password" });

        // generate the jwt token
        const accessToken = jwt.sign(
          { email: u.email, userId: u._id },
          JWT_SECRET!,
          {
            expiresIn: "1h",
          }
        );

        return res
          .status(200)
          .json({ accessToken: accessToken, userId: u._id });
      });
    })
    .catch((e) => {
      log.error(e);
      return res.status(500);
    });
};
