import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRoutes = Router()
.get('/users', UsersController.getAll)
.post('/users', UsersController.createUser)
.post('/auth', UsersController.authUser)

export default usersRoutes;