import { Router } from "express";
import { checkAuth, checkStandardRole, checkAdminRole } from "../middlewares/auth.middleware.js";
import { handleError } from "../middlewares/error.middleware.js";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Ruta para obtener todos los usuarios
router.get("/", checkAuth, checkStandardRole, async (req, res, next) => {
    try {
        const usersFound = await userManager.getAll(req.query);
        res.status(200).json({ status: true, payload: usersFound });
    } catch (error) {
        next(error);
    }
});

// Ruta para obtener un usuario por su ID
router.get("/:id", checkAuth, checkStandardRole, async (req, res, next) => {
    try {
        const userFound = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: userFound });
    } catch (error) {
        next(error);
    }
});

// Ruta para crear un nuevo usuario
router.post("/", checkAuth, checkAdminRole, async (req, res, next) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: userCreated });
    } catch (error) {
        next(error);
    }
});

// Ruta para actualizar un usuario existente
router.put("/:id", checkAuth, checkAdminRole, async (req, res, next) => {
    try {
        const userUpdated = await userManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: userUpdated });
    } catch (error) {
        next(error);
    }
});

// Ruta para eliminar un usuario por su ID
router.delete("/:id", checkAuth, checkAdminRole, async (req, res, next) => {
    try {
        const userDeleted = await userManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: userDeleted });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;