import { Router } from "express";
import RecipeManager from "../../managers/RecipeManager.js";

const router = Router();
const recipeManager = new RecipeManager();

const RESPONSE_MESSAGE_500 = "Hubo un error en el Servidor HTTP";
const RESPONSE_MESSAGE_400 = "Faltan datos para la receta";
const RESPONSE_MESSAGE_404 = "Receta no encontrada. ID incorrecto";

router.get("/", async (req, res) => {
    try {
        const recipes = await recipeManager.getAll();
        res.status(200).json({ status: true, payload: recipes });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const recipeFound = await recipeManager.getOneById(id);

        if (!recipeFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        res.status(200).json({ status: true, payload: recipeFound });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.post("/", async (req, res) => {
    try {
        const { observations } = req.body;

        const recipe = await recipeManager.insertOne({ ingredients: [], observations });

        res.status(201).json({ status: true, payload: recipe });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { ingredients, observations } = req.body;

        if (!ingredients) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const id = Number(req.params.id);
        const recipeFound = await recipeManager.getOneById(id);

        if (!recipeFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        const recipe = await recipeManager.updateOneById(id, { ingredients, observations });

        res.status(200).json({ status: true, payload: recipe });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const recipeFound = await recipeManager.getOneById(id);

        if (!recipeFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        await recipeManager.deleteOneById(id);

        res.status(200).json({ status: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

export default router;