import { Application, Router } from "express";
import usersRoutes from "./usersRoutes";

const routes = ((app: Application) => {
    app.use(
        usersRoutes
    )
});

export default routes;