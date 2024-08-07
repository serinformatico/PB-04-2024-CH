import { STATUS_CODES } from "../constants/messages.constant.js";

// Middleware para manejar los errores de API
// Importante: Es determinante mantener declarado el 4to parámetro "next".
// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
    const code = STATUS_CODES[error.message] ?? 500;
    res.status(code).json({ status: false, message: error.message });
};