/*
    ACTIVIDAD EN CLASE: Datos personales

    Basándonos en el ejemplo anterior, desarrollar una vista web que
    permita mostrar los datos personales de múltiples usuarios.

    1. Utilizar la misma estructura mostrada por el profesor, para poder
       levantar un servidor que utilice handlebars como motor de plantillas.
    2. Configurar la plantilla para que muestre los siguientes datos: nombre,
       apellido, edad, correo, teléfono.
    3. Crear un array “users” que cuente con 5 usuarios de tipo objeto, cada
       uno con los datos mencionados arriba.
    4. Al llamar al método get ‘/’, generar un número random para elegir a
       alguno de los usuarios y mostrar el usuario seleccionado al azar en
       la plantilla.
    5. Observar los diferentes resultados en el navegador.
*/

import express from "express";
import handlebars from "express-handlebars";
import paths from "./utils/paths.js";
import users from "./users.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Declaración del motor de plantillas
server.engine("handlebars", handlebars.engine());
server.set("views", paths.views);
server.set("view engine", "handlebars");

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

// Endpoint de prueba
server.get("/api/users", (req, res) => {
    const randomID = Math.floor(Math.random() * users.length);
    const user = users[randomID];

    res.render("users", { title: "Usuarios", user });
});

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