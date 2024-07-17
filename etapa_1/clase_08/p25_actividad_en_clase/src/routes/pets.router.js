import { Router } from "express";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
    res.send({ pets });
});

router.post("/", (req, res) => {
    const { name, specie } = req.body;

    pets.push({ name, specie });
    res.status(303).redirect("http://localhost:8080/api/public/");
});

export default router;