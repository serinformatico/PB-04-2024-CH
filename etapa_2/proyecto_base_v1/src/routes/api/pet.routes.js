import { Router } from "express";
import PetManager from "../../managers/pet.manager.js";
import { ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../../constants/messages.constant.js";

const router = Router();
const petManager = new PetManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

// Ruta para obtener todas las mascotas
router.get("/", async (req, res) => {
    try {
        const petsFound = await petManager.getAll(req.query);
        res.status(200).json({ status: true, payload: petsFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para obtener una mascota por su ID
router.get("/:id", async (req, res) => {
    try {
        const petFound = await petManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: petFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para crear una nueva mascota
router.post("/", async (req, res) => {
    try {
        const petCreated = await petManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: petCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para actualizar una mascota existente
router.put("/:id", async (req, res) => {
    try {
        const petUpdated = await petManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: petUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para eliminar una mascota por su ID
router.delete("/:id", async (req, res) => {
    try {
        const petDeleted = await petManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: petDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;