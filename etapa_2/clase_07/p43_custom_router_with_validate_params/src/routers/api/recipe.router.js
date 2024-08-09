
import BaseRouter from "../base.router.js";
import RecipeManager from "../../managers/recipe.manager.js";
import { ADMIN, STANDARD, PREMIUM } from "../../constants/roles.constant.js";

export default class RecipeRouter extends BaseRouter {
    #recipeManager;

    constructor() {
        super();
        this.#recipeManager = new RecipeManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [STANDARD], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [STANDARD], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [ PREMIUM, ADMIN ], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [PREMIUM], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [ADMIN], (req, res) => this.#delete(req, res));
        this.addPutRoute("/:rid/ingredients/:iid", [STANDARD], (req, res) => this.#addOneIngredient(req, res));
        this.addDeleteRoute("/:rid/ingredients/:iid", [STANDARD], (req, res) => this.#removeOneIngredient(req, res));
        this.addDeleteRoute("/:rid/ingredients", [STANDARD], (req, res) => this.#removeAllIngredients(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud GET para obtener todos los recetas
    async #getAll(req, res) {
        try {
            const recipesFound = await this.#recipeManager.getAll(req.query);
            res.sendSuccess200(recipesFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener un receta por ID
    async #getById(req, res) {
        try {
            const recipeFound = await this.#recipeManager.getOneById(req.params.id);
            res.sendSuccess200(recipeFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud POST para crear un nuevo receta
    async #create(req, res) {
        try {
            const recipeCreated = await this.#recipeManager.insertOne(req.body);
            res.sendSuccess201(recipeCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para actualizar un receta existente
    async #update(req, res) {
        try {
            const recipeUpdated = await this.#recipeManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(recipeUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un receta por ID
    async #delete(req, res) {
        try {
            const recipeDeleted = await this.#recipeManager.deleteOneById(req.params.id);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud PUT para agregar un ingrediente a una receta específica
    async #addOneIngredient(req, res) {
        try {
            const { rid, iid } = req.params;
            const { quantity } = req.body;
            const recipeUpdated = await this.#recipeManager.addOneIngredient(rid, iid, quantity ?? 1);
            res.sendSuccess200(recipeUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar un ingrediente específico de una receta
    async #removeOneIngredient(req, res) {
        try {
            const { rid, iid } = req.params;
            const recipeDeleted = await this.#recipeManager.removeOneIngredient(rid, iid, 1);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud DELETE para eliminar todos los ingredientes de una receta específica
    async #removeAllIngredients(req, res) {
        try {
            const recipeDeleted = await this.#recipeManager.removeAllIngredients(req.params.rid);
            res.sendSuccess200(recipeDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}