import { Router } from "express";
import UserManager from "../managers/UserManager.js";

const router = Router();
const userManager = new UserManager();

// Middleware para validar la sesión del usuario
const validateSession = (req, res, next) => {
    if (!req.isAuthenticated()) {
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
    res.status(401).send("<h1>Error 401</h1><h3>Fallo la autenticación con GitHub</h3>");
});

// Ruta para manejar el éxito del login con GitHub
router.get("/github/login-success", (req, res) => {
    res.status(200).redirect("/");
});

// Ruta para mostrar el perfil del usuario
router.get("/profile", validateSession, async (req, res) => {
    try {
        const id = req.session?.passport?.user?.id;
        const userFound = await userManager.getOneById(id);

        res.status(200).render("profile", userFound);
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
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