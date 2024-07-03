import { Router } from "express";
import StudentsManager from "../managers/StudentsManager.js";

import { ERROR_SERVER } from "../constants/messages.constant.js";

const router = Router();
const studentsManager = new StudentsManager();

router.get("/", async (req, res) => {
    try {
        const data = await studentsManager.getAll(req.query);
        res.status(200).render("students", { title: "Estudiantes", data });
    } catch (error) {
        res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER}</h3>`);
    }
});

export default router;