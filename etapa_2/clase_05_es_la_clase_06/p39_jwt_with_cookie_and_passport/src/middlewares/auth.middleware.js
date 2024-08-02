import passport from "passport";
import { ERROR_NOT_FOUND_TOKEN, ERROR_INVALID_TOKEN, ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

const translator = {
    ["No auth token"]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_NOT_FOUND_TOKEN}</h3>`,
    ["invalid token"]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_INVALID_TOKEN}</h3>`,
    [ERROR_INVALID_ID]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_INVALID_ID}</h3>`,
    [ERROR_NOT_FOUND_ID]: `<h1>Recurso Protegido</h1><h3 style='color: red;'>${ERROR_NOT_FOUND_ID}</h3>`,
};

// Middleware para verificar la autenticación del usuario
export const checkAuth = async (req, res, next) => {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(401).send(translator[info.message]);

        req.user = user;

        next();
    })(req, res, next);
};