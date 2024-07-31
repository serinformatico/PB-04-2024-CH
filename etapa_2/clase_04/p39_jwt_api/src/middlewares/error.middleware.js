import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

// Definición de los mensajes de error con sus respectivos códigos de estado HTTP
const errorMessages = {
    [ERROR_INVALID_ID]: { code: 400, message: ERROR_INVALID_ID },
    [ERROR_NOT_FOUND_ID]: { code: 404, message: ERROR_NOT_FOUND_ID },
    [ERROR_NOT_FOUND_CREDENTIALS]: { code: 401, message: ERROR_NOT_FOUND_CREDENTIALS },
};

// Captura los errores y envía una respuesta JSON con el código de estado y mensaje.
// Es determinante mantener declarado el 4to parámetro "next".
// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
    const errorMessage = errorMessages[error.message] || { code: 500, message: error.message };
    res.status(errorMessage.code).json({ status: false, message: errorMessage.message });
};