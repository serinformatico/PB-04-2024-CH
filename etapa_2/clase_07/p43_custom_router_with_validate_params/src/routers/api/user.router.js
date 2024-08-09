
import BaseRouter from "../base.router.js";
import UserManager from "../../managers/user.manager.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";

export default class UserRouter extends BaseRouter {
    #userManager;

    constructor() {
        super();
        this.#userManager = new UserManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [ADMIN], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud GET para obtener todos los usuarios
    async #getAll(req, res) {
        try {
            const usersFound = await this.#userManager.getAll(req.query);
            res.sendSuccess200(usersFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener un usuario por ID
    async #getById(req, res) {
        try {
            const userFound = await this.#userManager.getOneById(req.params.id);
            res.sendSuccess200(userFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud POST para crear un nuevo usuario
    async #create(req, res) {
        try {
            const userCreated = await this.#userManager.insertOne(req.body);
            res.sendSuccess201(userCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para actualizar un usuario existente
    async #update(req, res) {
        try {
            const userUpdated = await this.#userManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(userUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un usuario por ID
    async #delete(req, res) {
        try {
            const userDeleted = await this.#userManager.deleteOneById(req.params.id);
            res.sendSuccess200(userDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}