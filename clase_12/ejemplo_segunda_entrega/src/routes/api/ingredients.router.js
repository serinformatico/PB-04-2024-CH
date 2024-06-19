import { Router } from "express";
import IngredientManager from "../../managers/IngredientManager.js";

const router = Router();
const ingredientManager = new IngredientManager();

const RESPONSE_MESSAGE_500 = "Hubo un error en el Servidor HTTP";
const RESPONSE_MESSAGE_400 = "Faltan datos para el ingrediente";
const RESPONSE_MESSAGE_404 = "Ingrediente no encontrado. ID incorrecto";

router.get("/", async (req, res) => {
    try {
        const ingredients = await ingredientManager.getAll();
        res.status(200).json({ status: true, payload: ingredients });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ingredientFound = await ingredientManager.getOneById(id);

        if (!ingredientFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        res.status(200).json({ status: true, payload: ingredientFound });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const ingredient = await ingredientManager.insertOne({ name, description });

        res.status(201).json({ status: true, payload: ingredient });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name && !description) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_400 });
        }

        const id = Number(req.params.id);
        const ingredientFound = await ingredientManager.getOneById(id);

        if (!ingredientFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        const ingredient = await ingredientManager.updateOneById(id, { name, description });

        res.status(200).json({ status: true, payload: ingredient });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const ingredientFound = await ingredientManager.getOneById(id);

        if (!ingredientFound) {
            return res.status(400).json({ status: false, message: RESPONSE_MESSAGE_404 });
        }

        await ingredientManager.deleteOneById(id);

        res.status(200).json({ status: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

export default router;