import express from "express";
import session from "express-session";
import sessionFileStore from "session-file-store";
import paths from "./utils/paths.js";
import examplesRouter from "./routes/examples.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Middleware para decodificar datos de formularios y JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/*
    Atributos de FileStore:
        - path: Especifica la ruta en donde se almacenarán los archivos de sesión.
        - ttl (Time To Live): Define el tiempo de vida de la sesión en segundos.
        - retries: Indica cuántas veces se debe intentar guardar la sesión en caso
          de que falle el primer intento. El valor por defecto es 5.
*/

// Configuración del store de sesiones
const FileStore = sessionFileStore(session);
const storeOptions = new FileStore({
    path: paths.sessions,
    ttl: 2 * 60 * 60, // 2 horas
    retries: 0,
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