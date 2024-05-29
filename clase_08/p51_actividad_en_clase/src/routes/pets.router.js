import { Router } from "express";
import uploader from "../utils/uploader.js";

const router = Router();
const pets = [];

router.get("/", (req, res) => {
    res.send({ pets });
});

router.post("/", uploader.single("file"), (req, res) => {
    const { name, specie } = req.body;
    const { file } = req;

    if (!file) {
        return res.status(400).send({ status: "error", message: "Sin archivo" });
    }

    pets.push({
        thumbnail: [`http://localhost:8080/api/public/images/${file.filename}`],
        name,
        specie,
    });

    res.status(303).redirect(`http://localhost:8080/api/public`);
});

export default router;