/*
    ACTIVIDAD EN CLASE: Express + multer

    Basado en el formulario para ingresar una mascota al sistema:

    1. Configurar el formulario para añadir un campo input type="file"
       name "file" para que la mascota a agregar pueda tener una "imagen
       representativa".
    2. El nombre del archivo guardado se formará con el nombre original
       anteponiéndole un timestamp (Date.now()) seguido con un guión.
       Ej: 1610894554093-clase1.zip.
    3. Corroborar que la imagen se guarde correctamente. Guardar la ruta
       del archivo guardado en un campo "thumbnail".
*/

import express from "express";
import path from "path";

// Importación de enrutadores
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(path.join("src", "public")));

// Declaración de enrutadores
server.use("/api/users", usersRouter);
server.use("/api/pets", petsRouter);

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