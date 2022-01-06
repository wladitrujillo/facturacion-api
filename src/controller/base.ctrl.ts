import { Request, Response } from "express";
import { PageRequest } from "../model/page-request";
import CrudService = require("../service/crud.service");
import mongoose = require("mongoose");
import { getLogger } from 'log4js';

const logger = getLogger("BaseController");

abstract class BaseController<T extends mongoose.Document> {

    public _service: CrudService<T>;

    constructor(service: CrudService<T>) {

        this._service = service;
    }

    create = async (req: Request, res: Response) => {
        logger.debug("Start create");
        try {
            req.body.enterprise = res.locals.jwtPayload.enterprise;
            let objectParam: T = <T>req.body;

            let objectCreated = await this._service.create(objectParam);
            res.send(objectCreated);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    update = async (req: Request, res: Response) => {
        logger.debug("Start update");
        try {
            var objectParam: T = <T>req.body;
            let objectUpdated = await this._service.update(req.params._id, objectParam);
            res.send(objectUpdated);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }
    
    delete = async (req: Request, res: Response) => {
        logger.debug("Start delete");
        try {
            await this._service.delete(req.params._id);
            res.send({ "success": "success" })
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    retrieve = async (req: Request, res: Response) => {
        logger.debug("Start retrive");
        try {

            let enterprise = res.locals.jwtPayload.enterprise;
            let pageRequest = new PageRequest(req);
            let response: any = await this._service.retrieve({ enterprise: enterprise }, pageRequest);
            res.header('X-Total-Count', response.total);
            res.send(response.data);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }

    findById = async (req: Request, res: Response) => {
        logger.debug("Start findById");
        try {
            let objectFound = await this._service.findById(req.params._id);
            res.send(objectFound);
        }
        catch (error) {
            logger.error(error);
            res.status(500).send(error.message);

        }
    }


}
export = BaseController;
