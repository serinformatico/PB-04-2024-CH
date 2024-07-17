import { Router } from "express";
import RecipeManager from "../../managers/RecipeManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../../constants/messages.constant.js";

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const recipeManager = new RecipeManager();

router.get("/", async (req, res) => {
    try {
        const recipesFound = await recipeManager.getAll(req.query);
        res.status(200).json({ status: true, payload: recipesFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const recipeFound = await recipeManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: recipeFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const recipeCreated = await recipeManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: recipeCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const recipeUpdated = await recipeManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: recipeUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const recipeDeleted = await recipeManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: recipeDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id/ingredients/:iid", async (req, res) => {
    try {
        const { id, iid: ingredientId } = req.params;
        const { amount } = req.body;
        const recipeCreated = await recipeManager.addOneIngredientByIdAndIngredientId(id, ingredientId, amount ?? 1);
        res.status(200).json({ status: true, payload: recipeCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id/ingredients/:iid", async (req, res) => {
    try {
        const { id, iid: ingredientId } = req.params;
        const recipeDeleted = await recipeManager.removeOneIngredientByIdAndIngredientId(id, ingredientId, 1);
        res.status(200).json({ status: true, payload: recipeDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id/ingredients", async (req, res) => {
    try {
        const recipeDeleted = await recipeManager.removeAllIngredientsById(req.params.id);
        res.status(200).json({ status: true, payload: recipeDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;