/*
    ACTIVIDAD EN CLASE: Handlebars con express

    Realizar un formulario en una nueva plantilla.

    1. Se creará un archivo "register.handlebars" como nueva plantilla,
       donde se colocará un form.
    2. Dicho form debe servir para registrar un usuario, por lo que
       contará con nombre, correo, y contraseña.
    3. Enviar los datos a una ruta POST ‘/user’, y guardar el usuario
       en un arreglo. Confirmar que el guardado se realice exitosamente.
*/

import express from "express";
import handlebars from "express-handlebars";
import paths from "./utils/paths.js";
import usersRouter from "./routes/users.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Declaración del motor de plantillas
server.engine("handlebars", handlebars.engine());
server.set("views", paths.views);
server.set("view engine", "handlebars");

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

// Declaración de enrutadores
server.use("/api/users", usersRouter);

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
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});