import { Router } from "express";
import CoursesManager from "../managers/CoursesManager.js";

import { ERROR_SERVER } from "../constants/messages.constant.js";

const router = Router();
const coursesManager = new CoursesManager();

router.get("/", async (req, res) => {
    try {
        const courses = await coursesManager.getAll(req.query);
        res.status(200).render("courses", { title: "Cursos", courses: courses.docs });
    } catch (error) {
        res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER}</h3>`);
    }
});

export default router;