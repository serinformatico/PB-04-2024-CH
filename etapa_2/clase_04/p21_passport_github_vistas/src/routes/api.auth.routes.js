import express from "express";
import passport from "passport";
import UserManager from "../managers/UserManager.js";

const router = express.Router();
const userManager = new UserManager();

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS || message === "Missing credentials") return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

// Ruta para iniciar la autenticación con GitHub
router.get("/github", passport.authenticate("github"));

// Ruta de callback para continuar con la autenticación de GitHub
router.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/github/login-failure",
    successRedirect: "/github/login-success",
}));

// Ruta para completar un registro incompleto de un usuario de GitHub
router.post("/github/register", async (req, res) => {
    try {
        await userManager.updateOneById(req.user?._id, { ...req.body, isEnabled: true });

        return res.status(200).redirect("/");
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;