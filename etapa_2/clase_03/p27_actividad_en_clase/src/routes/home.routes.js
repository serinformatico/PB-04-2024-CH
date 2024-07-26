import { Router } from "express";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

const router = Router();
const userManager = new UserManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

// Middleware para validar la sesión del usuario
const validateSession = (req, res, next) => {
    if(!req.session?.user?.loggedIn) {
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados");
    }

    // Si está autenticado, continúa al siguiente middleware o ruta
    next();
};

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    const session = {
        loggedIn: req.session?.user?.loggedIn ?? false,
        loggedOut: !(req.session?.user?.loggedIn ?? false),
    };

    res.status(200).render("home", session);
});

// Ruta para mostrar el formulario de registro de usuarios
router.get("/register", (req, res) => {
    res.status(200).render("register");
});

// Ruta para mostrar el formulario de inicio de sesión
router.get("/login", (req, res) => {
    res.status(200).render("login");
});

// Ruta para mostrar el formulario de restablecimiento de contraseña
router.get("/reset-password", (req, res) => {
    res.status(200).render("resetPassword");
});

// Ruta para mostrar el perfil del usuario
router.get("/profile", validateSession, async (req, res) => {
    try {
        const id = req.session?.user?.id;
        const userFound = await userManager.getOneById(id);

        res.status(200).render("profile", userFound);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;