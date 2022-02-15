import UserService = require("../service/user.service");
import BaseController = require("./base.ctrl");
import { IUser } from "../model/user";
import { Request, Response } from "express";

import { getLogger } from 'log4js';
import multer = require('multer');
import path from "path";
import fs from 'fs';

const logger = getLogger("UserController");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/cecy/profile_picture/');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
export class UserController extends BaseController<IUser>{

    constructor() {
        super(new UserService());
    }

    profileInfo = async (req: Request, res: Response) => {
        try {
            let objectFound = await new UserService().findById(res.locals.jwtPayload.sub);
            res.send(objectFound);
        }
        catch (error: any) {
            logger.error(error);
            res.send(error?.message);
        }
    }

    updatePassword = async (req: Request, res: Response) => {

        try {
            let objectFound = await new UserService().updatePassword(res.locals.jwtPayload.sub, req.body.password);
            res.send(objectFound);
        }
        catch (error: any) {
            logger.error(error);
            res.send(error?.message);
        }

    }

    createUser = async (req: Request, res: Response) => {

        try {
            req.body.company = res.locals.jwtPayload.company;
            let user = await new UserService().createUser(req.body, req.body.password);
            res.send(user);
        }
        catch (error: any) {
            logger.error(error);
            let message = error.message;
            if (error.code == 11000) message = "Registro ya existe";
            res.send(message);
        }

    }
    public uploadProfilePicture = (req: Request, res: Response) => {

        let upload = multer({ storage: storage, fileFilter: this.imageFilter }).single('upload');
        upload(req, res, function (err: any) {

            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            if (err instanceof multer.MulterError) {

                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            // Display uploaded image for user validation
            res.send(`You have uploaded this image: <hr/><img src="${req?.file?.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        });

    }

    public getProfilePicture = (req: Request, res: Response) => {

        //read the image using fs and send the image content back in the response
        fs.readFile('/home/cecy/profile_picture/cecy.jpg', (err, content) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                logger.error(err);
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                res.writeHead(200, { 'Content-Type': 'image/jpg' });
                res.end(content);
            }
        });

    }


    private getFileExtension = (urlImage: string) => {
        let parts = urlImage.split('/');
        let fileName = '';
        logger.debug("url parts", parts);
        if (parts.length > 0) {
            fileName = parts[parts.length - 1];
        }
        return fileName.split('.')[1];
    }

    private imageFilter = function (req: any, file: any, cb: any) {   // Accept images only
        console.log("Entro a image filter");
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

}
