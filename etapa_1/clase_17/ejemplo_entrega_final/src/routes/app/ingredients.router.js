import { Router } from "express";
import IngredientManager from "../../managers/IngredientManager.js";
import moment from "moment";

import {
    ERROR_SERVER,
} from "../../constants/messages.constant.js";

const router = Router();
const ingredientManager = new IngredientManager();

router.get("/:id/recipe/:rid", async (req, res) => {
    try {
        const { id, rid: recipeId } = req.params;
        const data = await ingredientManager.getOneById(id);
        data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
        data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");
        data.currentRecipeId = recipeId;

        res.status(200).render("ingredient", { title: "Ingrediente", data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;