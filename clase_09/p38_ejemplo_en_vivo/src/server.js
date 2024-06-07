/*
    Ejemplo de estructuras con Handlebars

    1. Agregar un arreglo con nombre "food", el cual contendrá 5 objetos
       con los datos: name, price
    2. Con base en la estructura ya desarrollada. Agregar al usuario de
       prueba un campo "role" el cual podrá ser "admin" o "user"
    3. Modificar la plantilla para que, si el usuario es de rol admin, pueda
       ver la lista de alimentos, si es usuario, sólo verá la bienvenida
*/

import express from "express";
import handlebars from "express-handlebars";
import paths from "./utils/paths.js";
import usersRouter from "./routes/users.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

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