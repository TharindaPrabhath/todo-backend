import { Request } from "express";

interface MyRequest extends Request {
  userId: string;
}

export default MyRequest;
