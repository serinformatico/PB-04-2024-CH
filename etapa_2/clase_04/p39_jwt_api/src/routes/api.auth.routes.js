import express from "express";
import { handleError } from "../middlewares/error.middleware.js";
import { generateToken } from "../utils/security.js";
import UserManager from "../managers/UserManager.js";

const router = express.Router();
const userManager = new UserManager();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res, next) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        const accessToken = generateToken(userCreated._id, userCreated.role);

        res.status(200).json({ status: true, token: accessToken });
    } catch (error) {
        next(error);
    }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);
        const accessToken = generateToken(userFound._id, userFound.role);

        res.status(200).json({ status: true, token: accessToken });
    } catch (error) {
        next(error);
    }
});

// Ruta para restaurar la contraseña
router.post("/reset-password", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userUpdated = await userManager.resetPasswordByEmail(email, password);
        const accessToken = generateToken(userUpdated._id, userUpdated.role);

        res.status(200).json({ status: true, token: accessToken });
    } catch (error) {
        next(error);
    }
});

// Middleware de manejo de errores
router.use(handleError);

export default router;