/*
    Tipos de Middlewares

    Una aplicación Express puede utilizar los siguientes tipos de middleware:
        - Middleware a nivel de aplicación
        - Middleware a nivel endpoint
        - Middleware a nivel del Router
        - Middleware de manejo de errores
        - Middleware incorporado
        - Middleware de terceros
*/
// TODA PROBAR ***********************

import express from "express";
import path from "path";
import cookieParser from "cookie-parser";

const server = express();
const router = express.Router();
const PORT = 8080;
const HOST = "localhost";

// Middleware incorporado (express.static)
server.use("/api/public", express.static(path.basename("public")));

// Middleware de terceros
server.use(cookieParser());

// Middleware de nivel de aplicación
server.use((req, res, next) => {
    const now = new Date();
    console.log('Hora:', now.toLocaleTimeString());
    next();
});

// Middleware de nivel de endpoint
const middlewareA = (req, res, next) => {
    req.saludo = 'Hola. Buenas tardes';

    // La siguiente línea genera un error para que sea capturado
    // por el Middleware de manejo de errores (descomentar para probar).
    // req.saludo = 'Hola. Buenas tardes' + saludo.ser;
    next();
};
server.get('/saludo', middlewareA, (req, res) => {
    res.json({
        saludo: req.saludo,
    });
});

// Middleware de nivel del Router
router.use((req, res, next) => {
    const now = new Date();
    console.log('Hora:', now.toLocaleDateString());
    next();
});

// Middleware de manejo de errores
server.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Hubo un error en el servidor");
});

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(500).send("hubo un error en el servidor");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});