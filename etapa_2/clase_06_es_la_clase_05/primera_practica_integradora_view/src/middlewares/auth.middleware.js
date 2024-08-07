import jwt from "jsonwebtoken";
import passport from "passport";
import UserManager from "../managers/user.manager.js";
import { ERROR_NOT_HAVE_PRIVILEGES, JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userManager = new UserManager();

// Middleware para generar un token de acceso para un usuario autenticado
export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Busca al usuario por email y contraseña
        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        // Genera un token JWT que expira en 2 horas
        const token = jwt.sign({ id: userFound._id, role: userFound.role }, process.env.SECRET_KEY, { expiresIn: "2h" });

        // Determina si la URL de la solicitud se hizo en la API
        const isAPI = req.originalUrl.startsWith("/api/");
        if (isAPI) {
            // Coloca el token en el request
            req.token = token;
        } else {
            // Coloca el token en una cookie que expira en 2 horas
            res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });
        }

        // Llama al siguiente middleware
        next();
    } catch (error) {
        next(error);
    }
};

// Middleware para verificar la autenticación del usuario
export const checkAuth = (req, res, next) => {
    // Determina si la URL de la solicitud se hizo en la API para definir la estrategia
    const isAPI = req.originalUrl.startsWith("/api/");
    const strategy = isAPI ? "jwt-api" : "jwt-views";

    // Autentica al usuario utilizando la estrategia proporcionada por Passport
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
        if (error) return next(error);

        // Si no se encuentra el usuario autenticado y la solicitud viene desde
        // la ruta del template de "login", re-dirige al login. Caso contrario,
        // re-dirige al template de error401.
        if (!user) {
            res.view = req.originalUrl.startsWith("/login") ? null : "error401";
            return next(new Error(JWT_TRANSLATIONS[info.message] ?? info.message));
        }

        // Guarda el rol del usuario en el request
        req.role = user.role;

        // Llama al siguiente middleware
        next();
    })(req, res, next);
};

// Middleware para verificar si el usuario es un administrador
export const checkAdminRole = (req, res, next) => {
    // Si el usuario no tiene rol de administrador, re-dirige al template de error403
    if (req.role != "admin") {
        res.view = "error403";
        return next(new Error(ERROR_NOT_HAVE_PRIVILEGES));
    }

    // Si el usuario tiene rol de administrador, llama al siguiente middleware
    return next();
};