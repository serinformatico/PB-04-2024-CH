import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

// Definición de los mensajes de error con sus respectivos códigos de estado HTTP
const errorMessages = {
    [ERROR_INVALID_ID]: { code: 400, message: ERROR_INVALID_ID },
    [ERROR_NOT_FOUND_ID]: { code: 404, message: ERROR_NOT_FOUND_ID },
};

// Middleware para manejar los errores de API
// Importante: Es determinante mantener declarado el 4to parámetro "next".
// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
    const code = errorMessages[error.message]?.code || 500;
    const message = errorMessages[error.message]?.message || error.message;
    res.status(code).json({ status: false, message });
};