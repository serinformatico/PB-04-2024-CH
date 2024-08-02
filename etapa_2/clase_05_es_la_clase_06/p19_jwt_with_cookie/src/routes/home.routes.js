import { Router } from "express";

const router = Router();

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    res.status(200).render("home");
});

// Ruta para iniciar sesión
router.get("/login", async (req, res) => {
    res.status(200).render("login");
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    // Borra la cookie del token de acceso
    res.clearCookie("cookieToken");
    res.status(200).send("Has cerrado sesión correctamente");
});

export default router;