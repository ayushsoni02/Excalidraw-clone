import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"] ?? "";

    const decoded = jwt.verify(token,JWT_SECRET);

    if(decoded){
        //@ts-ignore
       const userId = decoded.userId;
       next();
    }else{
        res.status(403).json({
            message:"Unauthorized"
        })
        return;
    }
}