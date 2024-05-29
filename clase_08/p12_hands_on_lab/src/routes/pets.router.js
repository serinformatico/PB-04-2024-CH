import { Router } from "express";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
    res.send({ pets });
});

router.post("/", (req, res) => {
    const { name, specie } = req.body;

    pets.push({ name, specie });
    res.send({ status: "success" })
});

export default router;