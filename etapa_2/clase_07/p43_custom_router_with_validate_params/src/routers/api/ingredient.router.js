
import BaseRouter from "../base.router.js";
import IngredientManager from "../../managers/ingredient.manager.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";

export default class IngredientRouter extends BaseRouter {
    #ingredientManager;

    constructor() {
        super();
        this.#ingredientManager = new IngredientManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [ADMIN], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [ADMIN], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud GET para obtener todos los ingredientes
    async #getAll(req, res) {
        try {
            const ingredientsFound = await this.#ingredientManager.getAll(req.query);
            res.sendSuccess200(ingredientsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener un ingrediente por ID
    async #getById(req, res) {
        try {
            const ingredientFound = await this.#ingredientManager.getOneById(req.params.id);
            res.sendSuccess200(ingredientFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud POST para crear un nuevo ingrediente
    async #create(req, res) {
        try {
            const ingredientCreated = await this.#ingredientManager.insertOne(req.body);
            res.sendSuccess201(ingredientCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para actualizar un ingrediente existente
    async #update(req, res) {
        try {
            const ingredientUpdated = await this.#ingredientManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(ingredientUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un ingrediente por ID
    async #delete(req, res) {
        try {
            const ingredientDeleted = await this.#ingredientManager.deleteOneById(req.params.id);
            res.sendSuccess200(ingredientDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}