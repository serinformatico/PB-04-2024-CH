import express from "express";
import paths from "./utils/paths.js";
import handlebars from "./config/handlebars.config.js";
import serverSocket from "./config/socket.config.js";
import homeRouter from "./routes/home.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Definición de enrutadores
server.use("/home", homeRouter);

// Configuración del motor de plantillas
handlebars.config(server);

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

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
const serverHTTP = server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});

// Configuración del servidor de websocket
serverSocket.config(serverHTTP);