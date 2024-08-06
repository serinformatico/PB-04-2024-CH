import { Router } from "express";
import RecipeManager from "../../managers/recipe.manager.js";
import { handleError } from "../../middlewares/error.middleware.js";

const router = Router();
const recipeManager = new RecipeManager();

// Ruta para obtener todas las recetas
router.get("/", async (req, res, next) => {
    try {
        const recipes = await recipeManager.getAll(req.query);
        res.status(200).json({ status: true, payload: recipes });
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener una receta por su ID
router.get("/:id", async (req, res, next) => {
    try {
        const recipe = await recipeManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para crear una nueva receta
router.post("/", async (req, res, next) => {
    try {
        const recipe = await recipeManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para actualizar una receta existente por su ID
router.put("/:id", async (req, res, next) => {
    try {
        const recipe = await recipeManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar una receta por su ID
router.delete("/:id", async (req, res, next) => {
    try {
        const recipe = await recipeManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para agregar un ingrediente a una receta específica
router.put("/:rid/ingredients/:iid", async (req, res, next) => {
    try {
        const { rid, iid } = req.params;
        const { quantity } = req.body;
        const recipe = await recipeManager.addOneIngredient(rid, iid, quantity ?? 1);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un ingrediente específico de una receta
router.delete("/:rid/ingredients/:iid", async (req, res, next) => {
    try {
        const { rid, iid } = req.params;
        const recipe = await recipeManager.removeOneIngredient(rid, iid, 1);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar todos los ingredientes de una receta específica
router.delete("/:rid/ingredients", async (req, res, next) => {
    try {
        const recipe = await recipeManager.removeAllIngredients(req.params.rid);
        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;