import BaseRouter from "../base.router.js";
import { generateToken } from "../../middlewares/auth.middleware.js";

export default class AuthRouter extends BaseRouter {
    constructor() {
        super();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addPostRoute("/login", [], generateToken, (req, res) => this.#login(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud POST para generar un token
    #login(req, res) {
        try {
            const token = req.token ?? null;
            res.sendSuccess201(token);
        } catch (error) {
            res.sendError(error);
        }
    }
}