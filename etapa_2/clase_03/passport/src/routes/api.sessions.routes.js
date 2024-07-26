import { Router } from "express";
import passport from "passport";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

const router = Router();
const userManager = new UserManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS || message === "Missing credentials") return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

// Ruta para registrar un nuevo usuario
router.post("/register", (req, res, next) => {
    // Utiliza Passport para autenticar el registro
    passport.authenticate("register", (error, user, info) => {
        if (error) return errorHandler(res, error.message);
        if (!user) return errorHandler(res, info.message);

        // Inicia sesión al usuario después de un registro exitoso
        req.login(user, (errorLogin) => {
            if (errorLogin) return next(errorLogin);
            res.status(200).json({ status: true });
        });
    })(req, res, next);
});

// Ruta para iniciar sesión
router.post("/login", (req, res, next) => {
    // Utiliza Passport para autenticar el inicio de sesión
    passport.authenticate("login", (error, user, info) => {
        if (error) return errorHandler(res, error.message);
        if (!user) return errorHandler(res, info.message);

        // Inicia sesión al usuario después de una autenticación exitosa
        req.login(user, (errorLogin) => {
            if (errorLogin) return next(errorLogin);
            res.status(200).json({ status: true });
        });
    })(req, res, next);
});

// Ruta para restaurar la contraseña
router.post("/reset-password", async (req, res) => {
    try {
        const { email, password } = req.body;
        await userManager.resetPasswordByEmail(email, password);
        res.status(200).json({ status: true });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para cerrar sesión
router.post("/logout", (req, res) => {
    // Cierra la sesión del usuario
    req.logout((errorLogout) => {
        if (errorLogout) return next(errorLogout);
        res.status(200).json({ status: true });
    });
});

export default router;