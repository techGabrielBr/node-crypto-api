import { NextFunction, Request, Response } from "express";
import CryptoService from "../utils/cryptoService";
import User from "../Models/User";
import prisma from "../config/dbConnection";
import { Prisma } from "@prisma/client";

export default class UsersController {
    static createUser = async function (req: Request, res: Response, next: NextFunction){
        try {
            const user: User = req.body;
            user.password = CryptoService.encryptText(user.password);
            user.active = true;

            let createdUser = await prisma.user.create({
                data: user
            });

            res.status(201).send({
                message: "User created successfully"
            });
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(400).send({
                        message: "Email já cadastrado"
                    });
                }
            }
            
            res.status(500).send({
                message: "Internal server error"
            });
        }
    }

    static authUser = async function (req: Request, res: Response, next: NextFunction){
        try {
            const {email, password} = req.body;
            const encryptedPassword = CryptoService.encryptText(password);

            let user = await prisma.user.findUnique({
                where: {email: email, password: encryptedPassword}
            });

            if(user != null){
                res.status(200).send({authenticated: true});
            }else{
                res.status(400).send({
                    message: "Incorrect username and/or password"
                });
            }
        } catch (error) {
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