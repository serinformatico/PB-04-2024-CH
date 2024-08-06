import { Router } from "express";
import moment from "moment";
import IngredientManager from "../managers/ingredient.manager.js";
import { handleError } from "../middlewares/error.middleware.js";

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
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;