import { STATUS_CODES } from "../constants/messages.constant.js";

// Middleware para manejar los errores de Views y API
// Importante: Es determinante mantener declarado el 4to parámetro "next".
// eslint-disable-next-line no-unused-vars
export const handleError = (error, req, res, next) => {
    const code = STATUS_CODES[error.message] ?? 500;

    // Determina si la URL de la solicitud se hizo en la API
    const isAPI = req.originalUrl.startsWith("/api/");

    // Si la solicitud es de la API, responde con un JSON, sino, renderiza la view
    if (isAPI) {
        res.status(code).json({ status: false, message: error.message });
    } else {
        const view = res.view ?? "login";
        res.status(code).render(view, { errorMessage: error.message });
    }
};