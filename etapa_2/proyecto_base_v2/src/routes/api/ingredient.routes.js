import { Router } from "express";
import IngredientManager from "../../managers/ingredient.manager.js";
import { handleError } from "../../middlewares/error.middleware.js";

const router = Router();
const ingredientManager = new IngredientManager();

// Ruta para obtener todos los ingredientes
router.get("/", async (req, res, next) => {
    try {
        const ingredients = await ingredientManager.getAll(req.query);
        res.status(200).json({ status: true, payload: ingredients });
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener un ingrediente por ID
router.get("/:id", async (req, res, next) => {
    try {
        const ingredient = await ingredientManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: ingredient });
    } catch (error) {
        next(error);
    }
});

// Ruta para crear un nuevo ingrediente
router.post("/", async (req, res, next) => {
    try {
        const ingredient = await ingredientManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: ingredient });
    } catch (error) {
        next(error);
    }
});

// Ruta para actualizar un ingrediente existente por ID
router.put("/:id", async (req, res, next) => {
    try {
        const ingredient = await ingredientManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: ingredient });
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un ingrediente por ID
router.delete("/:id", async (req, res, next) => {
    try {
        const ingredient = await ingredientManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: ingredient });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;