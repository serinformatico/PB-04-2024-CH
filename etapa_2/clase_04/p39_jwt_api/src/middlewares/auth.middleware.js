import jwt from "jsonwebtoken";
import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

// Middleware para verificar la autenticación del usuario
export const checkAuth = async (req, res, next) => {
    // Obtener el token del header "Authorization" sin la palabra "Bearer"
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(400).json({ status: false, message: "Token no encontrado" });
    }

    try {
        // Verifica el token empleando la clave secreta
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userManager.getOneById(decoded.id);

        // Agrega información del usuario en la solicitud
        req.user = {
            id: user._id,
        };

        next();
    } catch (err) {
        res.status(401).json({ status: false, message: "Token inválido" });
    }
};