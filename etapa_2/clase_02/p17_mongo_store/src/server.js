import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import examplesRouter from "./routes/examples.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Middleware para decodificar datos de formularios y JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuración del store de sesiones
const storeOptions = MongoStore.create({
    mongoUrl: "mongodb+srv://sergio:Y2aiTV3letzbtqiV@cluster0.4i0l5oa.mongodb.net/class-zero",
    autoRemove: "native", // Eliminar automáticamente las sesiones expiradas
    // ttl: La expiración de la sesión se controla a través de cookie.maxAge.
});

// Configuración de la sesión
const sessionOptions = {
    store: storeOptions,
    secret: "miClaveSecreta",
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 horas
    saveUninitialized: false, // No guarda sesiones no inicializadas
    resave: false, // No resguardar si la sesión no ha cambiado
};

// Middleware para gestión de sesiones
server.use(session(sessionOptions));

// Enrutadores
server.use("/", examplesRouter);

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