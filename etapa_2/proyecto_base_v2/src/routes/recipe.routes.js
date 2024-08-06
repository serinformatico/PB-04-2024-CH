import { Router } from "express";
import moment from "moment";
import RecipeManager from "../managers/recipe.manager.js";
import { handleError } from "../middlewares/error.middleware.js";

const router = Router();
const recipeManager = new RecipeManager();

router.get("/:id", async (req, res, next) => {
    try {
        const data = await recipeManager.getOneById(req.params.id);
        data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
        data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");

        res.status(200).render("recipe", { title: "Receta", data });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;