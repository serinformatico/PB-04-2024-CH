import { Router } from "express";

const router = Router();
const users = [];

router.get("/register", (req, res) => {
    res.status(200).render("register", { title: "Registrarse" });
});

router.get("/", (req, res) => {
    res.status(200).render("users", { title: "Usuarios", users });
});

router.post("/", (req, res) => {
    const { name, email, password } = req.body;

    users.push({ name, email, password });
    res.status(201).render("registered", { title: "Usuarios", name });
});

export default router;