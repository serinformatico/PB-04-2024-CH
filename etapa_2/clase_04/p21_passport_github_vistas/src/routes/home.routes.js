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

// Función para obtener las cookies de API
const getCookiesAndData = async (url, body, sessionCookies) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": sessionCookies,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }

    const cookies = response.headers.get("set-cookie");
    return cookies;
};

// Middleware para validar la sesión del usuario
const validateSession = (req, res, next) => {
    if (!req.isAuthenticated() || !req.user.isEnabled) {
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados");
    }

    // Si está autenticado, continúa al siguiente middleware o ruta
    next();
};

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    const session = {
        loggedIn: req.isAuthenticated(),
        loggedOut: !req.isAuthenticated(),
        name: req.session?.passport?.user?.name,
    };

    res.status(200).render("home", session);
});

// Ruta para manejar el fallo del login con GitHub
router.get("/github/login-failure", (req, res) => {
    res.status(401).json({ status: false, message: "Fallo la autenticación con GitHub" });
});

// Ruta para manejar el éxito del login con GitHub
router.get("/github/login-success", (req, res) => {
    if (!req.user.isEnabled) {
        return res.status(200).render("register", req.user);
    }
    res.status(200).redirect("/");
});

// Ruta para manejar el registro de usuarios (atiende el post del form)
router.post("/register", async (req, res) => {
    try {
        const URL = "http://localhost:8080/api/auth/github/register";
        const cookies = await getCookiesAndData(URL, req.body, req.headers.cookie);
        res.setHeader("set-cookie", cookies);

        res.status(200).redirect("/");
    } catch (error) {
        res.status(400).render("register", { errorMessage: error.message });
    }
});

// Ruta para mostrar el perfil del usuario
router.get("/profile", validateSession, async (req, res) => {
    try {
        const id = req.session?.passport?.user?.id;
        const userFound = await userManager.getOneById(id);

        res.status(200).render("profile", userFound);
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para cerrar sesión
router.get("/logout", async (req, res) => {
    req.logout((errorLogout) => {
        if (errorLogout) return errorHandler(res, errorLogout.message);
        return res.status(200).redirect("/");
    });
});

export default router;