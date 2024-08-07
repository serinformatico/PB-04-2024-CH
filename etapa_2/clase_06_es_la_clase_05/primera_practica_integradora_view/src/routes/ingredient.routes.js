import { Router } from "express";
import moment from "moment";
import IngredientManager from "../managers/ingredient.manager.js";
import { handleError } from "../middlewares/error.middleware.js";
import { checkAdminRole, checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();
const ingredientManager = new IngredientManager();
const currentRecipeId = "66b163be0f5b3669610a832c"; // Aquí coloca el ID de la receta creada en tu BD

router.get("/", checkAuth, async (req, res, next) => {
    try {
        const data = await ingredientManager.getAll(req.query);
        data.sort = req.query?.sort ? `&sort=${req.query.sort}` : "";
        data.currentRecipeId = currentRecipeId;
        data.docs = data.docs.map((doc) => {
            return { ...doc, currentRecipeId };
        });

        res.status(200).render("ingredients", { title: "Ingredientes", data });
    } catch (error) {
        next(error);
    }
});

router.get("/:id/recipe/:rid", checkAuth, checkAdminRole, async (req, res, next) => {
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