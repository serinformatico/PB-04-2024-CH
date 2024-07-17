import { Router } from "express";
import IngredientManager from "../../managers/IngredientManager.js";
import uploader from "../../utils/uploader.js";

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
const ingredientManager = new IngredientManager();

router.get("/", async (req, res) => {
    try {
        const ingredientsFound = await ingredientManager.getAll(req.query);
        res.status(200).json({ status: true, payload: ingredientsFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const ingredientFound = await ingredientManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: ingredientFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const { file } = req;
        const ingredientCreated = await ingredientManager.insertOne(req.body, file?.filename);
        res.status(201).json({ status: true, payload: ingredientCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", uploader.single("file"), async (req, res) => {
    try {
        const { file } = req;
        const ingredientUpdated = await ingredientManager.updateOneById(req.params.id, req.body, file?.filename);
        res.status(200).json({ status: true, payload: ingredientUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ingredientDeleted = await ingredientManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: ingredientDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;