import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRoutes = Router()
.post('/users', UsersController.createUser)
.post('/auth', UsersController.authUser)

export default usersRoutes;