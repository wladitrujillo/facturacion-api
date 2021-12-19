import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    //Get the jwt token from the head
    //Try to validate the token and get data
    try {
        let token = <string>req.headers["authorization"];
        if (token)
            token = token.split(' ')[1];
        else {
            res.status(403).send("Not token found");
            return;
        }
        let jwtPayload = <any>jwt.verify(token, process.env.SECRET || '');
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        //If token is not valid, respond with 401 (unauthorized)
        res.status(401).send(error);
        return;
    }

    next();
};