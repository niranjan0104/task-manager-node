import { NextFunction } from "express";
import jwt from 'jsonwebtoken';
import db from "../config/db";

const authMiddleware = () => async (req: any, res: any, next: NextFunction) => {
    try {
      const token: any = req.header("authorization");
      if (!token) {
        return res.status(400).send({status: 400, message: "Authorization is required"});
      }

      const jwtKey: any = process.env.JWT_SECRET;
      const verified: any = jwt.verify(token, jwtKey);

      if(verified) {
        const user: any = await db("users").where("id", verified.id).first();
        if (user) {
          req.user = {id: user.id};
          next();
        } else {
          return res.status(401).send({status: 401, message: "Invalid Access Token"});
        }
      } else {
        return res.status(400).send({status: 400, messge: "Access Token Expired"});
      }
    } catch (JsonWebTokenError: any) {
            if (JsonWebTokenError.name == "TokenExpiredError") {
                return res.status(400).send({status: 400, message: "Token Expired"});
            }
            if (JsonWebTokenError.name == "JsonWebTokenError") {
                return res.staus(400).send({status: 400, message: "Malformed token"});
            }else {
                return res.staus(422).send({status: 422, message: JsonWebTokenError.message || "Something Went Wrong"})
            }
    }
}

export default authMiddleware;
