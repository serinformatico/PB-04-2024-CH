import express from "express";
import { generateToken } from "../utils/security.js";
import UserManager from "../managers/UserManager.js";

const router = express.Router();
const userManager = new UserManager();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        const accessToken = generateToken(userCreated._id);

        res.status(200).json({ status: true, token: accessToken });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);
        const accessToken = generateToken(userFound._id);

        res.status(200).json({ status: true, token: accessToken });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

export default router;