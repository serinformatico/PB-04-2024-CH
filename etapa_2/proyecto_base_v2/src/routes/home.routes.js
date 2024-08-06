import { Router } from "express";
import IngredientManager from "../managers/ingredient.manager.js";

import {
    ERROR_SERVER,
} from "../constants/messages.constant.js";

const router = Router();
const ingredientManager = new IngredientManager();
const currentRecipeId = "66b163be0f5b3669610a832c"; // Aquí coloca el ID de la receta creada en tu BD

router.get("/", async (req, res) => {
    try {
        const data = await ingredientManager.getAll(req.query);
        data.sort = req.query?.sort ? `&sort=${req.query.sort}` : "";
        data.currentRecipeId = currentRecipeId;
        data.docs = data.docs.map((doc) => {
            return { ...doc, currentRecipeId };
        });

        res.status(200).render("index", { title: "Inicio", data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;