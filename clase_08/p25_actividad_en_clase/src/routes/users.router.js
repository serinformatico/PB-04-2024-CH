import { Router } from "express";

const router = Router();
const users = [];

router.get("/", (req, res) => {
    res.send({ users });
});

router.post("/", (req, res) => {
    const { name, surname } = req.body;

    users.push({ name, surname });
    res.send({ status: "success" })
});

export default router;