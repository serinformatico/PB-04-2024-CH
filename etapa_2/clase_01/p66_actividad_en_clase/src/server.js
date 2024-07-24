import express from "express";
import session from "express-session";
import examplesRouter from "./routes/examples.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/*
    Atributos de Sesión:

    - secret: Este es un string que se usa para firmar y/o encriptar las cookies de sesión.
    - cookie: Este atributo establece la duración de la cookie de sesión en mili-segundos.
    - saveUninitialized: Este atributo indica que las sesiones no inicializadas deben ser
      guardadas en el almacén de sesiones. Una sesión se considera "no inicializada" cuando
      no se ha modificado. Esto puede ser útil para implementar contadores de visitantes o
      para rastrear sesiones no autenticadas.
    - resave: Este atributo determina si la sesión debe ser guardada de nuevo en el almacén
      de sesiones, incluso si no ha sido modificada durante la solicitud. Establecer esto en
      false puede ayudar a reducir el tráfico de almacenamiento de sesiones.
*/

const sessionOptions = {
    secret: "miClaveSecreta",
    cookie: { maxAge: 60 * 1000 },
    saveUninitialized: true,
    resave: false,
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