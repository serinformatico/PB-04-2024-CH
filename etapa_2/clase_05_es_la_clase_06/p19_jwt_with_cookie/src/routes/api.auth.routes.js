import express from "express";
import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js";

const router = express.Router();
const userManager = new UserManager();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        res.status(200).json({ status: true, payload: userCreated });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        // Genera un token de acceso utilizando el ID del usuario y el email
        const accessToken = jwt.sign({ id: userFound._id, email }, process.env.SECRET_KEY, { expiresIn: "2h" });

        /*
            Es una pésima práctica establecer el atributo httpOnly en "false" porque permite
            que la cookie sea accesible desde el código JavaScript del lado del cliente. Esto
            significa que el token almacenado en la cookie puede ser leído y manipulado por
            cualquier script que se ejecute en la página. Esta configuración hace que tu token
            sea vulnerable a ataques XSS. Si un atacante logra inyectar un script malicioso en
            tu aplicación, podría acceder y robar el token.
        */

        // Establece la cookie con el token de acceso
        res.cookie("cookieToken", accessToken, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

        res.status(200).json({ status: true, message: "Has conseguido un Token. Está en la cookie" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
});

export default router;