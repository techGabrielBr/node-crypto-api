import { NextFunction, Request, Response } from "express";
import CryptoService from "../utils/cryptoService";
import User from "../Models/User";
import prisma from "../config/dbConnection";
import { Prisma } from "@prisma/client";
import { registerUserSchema } from "../yup-schemas/registerUserSchema";
import { ValidationError } from "yup";
import { authUserSchema } from "../yup-schemas/authUserSchema";

export default class UsersController {
    static createUser = async function (req: Request, res: Response, next: NextFunction){
        try {
            const user: User = req.body;
            
            registerUserSchema.validateSync(user, {abortEarly: false, stripUnknown: true, strict: true})

            user.password = CryptoService.encryptText(user.password);
            user.active = true;

            let createdUser = await prisma.user.create({
                data: user
            });

            res.status(201).send({
                message: "User created successfully"
            });
        } catch (error) {
            console.log(error);
            
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(400).send({
                        message: "Email already registered"
                    });
                }
            }else if(error instanceof Prisma.PrismaClientValidationError){
                return res.status(422).send({
                    message: "Make sure all data is being provided correctly"
                });
            }else if(error instanceof ValidationError){
                return res.status(422).send({
                    message: error.errors
                });
            }
            
            res.status(500).send({
                message: "Internal server error"
            });
        }
    }

    static authUser = async function (req: Request, res: Response, next: NextFunction){
        try {
            const {body} = req;

            authUserSchema.validateSync(body, { abortEarly: false, stripUnknown: true, strict: true })

            const encryptedPassword = CryptoService.encryptText(body.password);

            let user = await prisma.user.findUnique({
                where: {email: body.email, password: encryptedPassword}
            });

            if(user != null){
                res.status(200).send({authenticated: true});
            }else{
                res.status(400).send({
                    message: "Incorrect username and/or password"
                });
            }
        } catch (error) {
            if (error instanceof Prisma.PrismaClientValidationError) {
                return res.status(422).send({
                    message: "Make sure all data is being provided correctly"
                });
            } else if (error instanceof ValidationError) {
                return res.status(422).send({
                    message: error.errors
                });
            }

            res.status(500).send({
                message: "Internal server error"
            });
        }
    }

    static getAll = async function (req: Request, res: Response, next: NextFunction) {
        try {
            let users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    active: true,
                    password: false
                }
            });

            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({
                message: "Internal server error"
            });
        }
    }
}