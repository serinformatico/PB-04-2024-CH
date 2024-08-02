import { Router } from "express";

const router = Router();

// Ruta para la página de inicio
router.get("/", async (req, res) => {
    res.status(200).render("home");
});

router.get("/login", async (req, res) => {
    res.status(200).render("login");
});

export default router;