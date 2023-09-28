import { NextFunction, Request, Response } from "express";
import CryptoService from "../utils/cryptoService";
import User from "../Models/User";
import prisma from "../config/dbConnection";

export default class UsersController {
    static createUser = async function (req: Request, res: Response, next: NextFunction){
        try {
            const user: User = req.body;
            user.password = CryptoService.encryptText(user.password);
            user.active = true;

            let createdUser = await prisma.user.create({
                data: user
            });

            res.status(201).send(createdUser);
        } catch (error) {
            res.status(500).send({
                message: "Erro interno no servidor"
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
                message: "Erro interno no servidor"
            });
        }
    }
}