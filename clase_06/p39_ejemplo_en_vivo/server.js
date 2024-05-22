/*
    PATH PARAMS: Caso práctico de uso de params

    1. Dado un arreglo de objetos de tipo usuario, realizar un servidor en
       express que permita obtener dichos usuarios.
    2. La ruta raíz "/" debe devolver todos los usuarios
    3. la ruta /:userId debe devolver sólo al usuario con dicho Id.
*/

import express from "express";
import usuarios from "./usuarios.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/
// Devuelve la lista de usuarios
server.get("/", (request, response) => {
    const usuariosJSON = JSON.stringify(usuarios);

    response.send(usuariosJSON);
});

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/1
// Devuelve un usuario especificado por ID
server.get("/:userId", (request, response) => {
    const { userId } = request.params;
    const usuarioEncontrado = usuarios.find((usuario) => usuario.id === Number(userId));

    if (!usuarioEncontrado) {
        return response.send({ error: "Id de usuario no encontrado" });
    }

    const usuarioEncontradoJSON = JSON.stringify(usuarioEncontrado);

    response.send(usuarioEncontradoJSON);
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});