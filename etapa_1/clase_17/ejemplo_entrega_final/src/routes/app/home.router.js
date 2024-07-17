import { Router } from "express";
import IngredientManager from "../../managers/IngredientManager.js";

import {
    ERROR_SERVER,
} from "../../constants/messages.constant.js";

const router = Router();
const ingredientManager = new IngredientManager();
const currentRecipeId = "6695d0d93bfd208904213471";

router.get("/ingredients", async (req, res) => {
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

router.get("/real-time-ingredients", async (req, res) => {
    try {
        res.status(200).render("realTimeIngredients", { title: "Tiempo Real" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;