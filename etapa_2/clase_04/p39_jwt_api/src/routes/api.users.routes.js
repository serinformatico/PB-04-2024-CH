import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Ruta para obtener todos los usuarios
router.get("/", checkAuth, async (req, res) => {
    try {
        const usersFound = await userManager.getAll(req.query);
        res.status(200).json({ status: true, payload: usersFound });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para obtener un usuario por su ID
router.get("/:id", checkAuth, async (req, res) => {
    try {
        const userFound = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: userFound });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para crear un nuevo usuario
router.post("/", checkAuth, async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: userCreated });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para actualizar un usuario existente
router.put("/:id", checkAuth, async (req, res) => {
    try {
        const userUpdated = await userManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: userUpdated });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para eliminar un usuario por su ID
router.delete("/:id", checkAuth, async (req, res) => {
    try {
        const userDeleted = await userManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: userDeleted });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

export default router;