import { Request, Response } from "express";
import db from "../config/db";
import bcrypt from "bcryptjs";
import authUtils from "../utils/authUtils";

const authController = {
    registerUser: async (req: Request, res: Response) => {
        try {
            const { body: {userName, email, password}} : any = req;

            const user: any = await db("users").where("email", email).first();
            if(user){
                return res.status(400).send({status: 400, message: "Email already exists"});
            }

            const hashed = await bcrypt.hash(password, 10);
            const [userId] = await db("users").insert({
                userName,
                email,
                password: hashed,
            });

            return res.status(201).send({status: 201, message: "User registered", userId});
        } catch (error: any) {
            console.error(error);
            return res.status(500).send({status: 500, message: "Internal server error" });
        }
    },

    loginUser: async (req: Request, res: Response) => {
        try {
            const { body: {email, password}} : any = req;
            const user: any = await db("users").where("email", email).first();
            
            if(user){
                const validatePass = await bcrypt.compare(password, user.password);
                if(validatePass){
                    const accessToken = await authUtils.generateToken(user.id);
                    res.header("Access-Token", accessToken);

                    delete user.password
                    delete user.createdAt
                    
                    return res.status(200).send({status: 200, message: "Login Successfully", user});
                }else{
                    return res.status(401).send({status: 401, message: "Invalid Credentials"});
                }
            }else{
                 return res.status(401).send({status: 401, message: "User account is not registered"});
            }

        } catch (error: any) {
            console.error(error);
            return res.status(500).send({ message: "Internal server error" });
        }
    }
}

export default authController;