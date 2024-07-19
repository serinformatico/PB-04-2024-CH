import express from "express";
import examplesRouter from "./routes/examples.router.js";
import cookieParser from "cookie-parser"; // se instala con npm i cookie-parser

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Middleware para gestión de cookies
server.use(cookieParser("miClaveSecreta"));

// Enrutadores
server.use("/examples", examplesRouter);

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
});