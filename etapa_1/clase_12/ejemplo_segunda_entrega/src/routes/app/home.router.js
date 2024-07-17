import { Router } from "express";

const router = Router();

const RESPONSE_MESSAGE_500 = "Hubo un error en el Servidor HTTP";

router.get("/ingredients", async (req, res) => {
    try {
        res.status(200).render("index", { title: "Inicio" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

router.get("/real-time-ingredients", async (req, res) => {
    try {
        res.status(200).render("realTimeIngredients", { title: "Tiempo Real" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: RESPONSE_MESSAGE_500 });
    }
});

export default router;