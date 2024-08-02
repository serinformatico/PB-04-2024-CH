import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta de la página de inicio
router.get("/", async (req, res) => {
    res.status(200).render("home");
});

// Ruta de la página de inicio de sesión
router.get("/login", async (req, res) => {
    res.status(200).render("login");
});

// Ruta de la página protegida por autenticación JWT
router.get("/current", checkAuth, async (req, res) => {
    res.status(200).render("current");
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    // Borra la cookie del token de acceso
    res.clearCookie("cookieToken");
    res.status(200).send("Has cerrado sesión correctamente");
});

export default router;