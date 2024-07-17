import { Router } from "express";
import RecipeManager from "../../managers/RecipeManager.js";
import moment from "moment";

import {
    ERROR_SERVER,
} from "../../constants/messages.constant.js";

const router = Router();
const recipeManager = new RecipeManager();

router.get("/:id", async (req, res) => {
    try {
        const data = await recipeManager.getOneById(req.params.id);
        data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
        data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");

        res.status(200).render("recipe", { title: "Receta", data });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, ERROR_SERVER });
    }
});

export default router;