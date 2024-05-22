/*
    QUERY PARAMS: Caso práctico de uso de req.query

    1. Dado un arreglo de objetos de tipo usuario, vamos a hacer un
       filtro por género
    2. La ruta raíz "/" debe devolver todos los usuarios, pero ahora
       colocaremos un query param con ? indicando que queremos un
       género específico. En caso de enviarlo sin query, debe devolver
       a todos los usuarios.
*/

import express from "express";
import usuarios from "./usuarios.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/?genero=F
// Devuelve la lista de usuarios filtrados por género
server.get("/", (request, response) => {
    const { genero } = request.query;
    let usuariosParaLaRespuesta = usuarios;

    if (genero) {
        usuariosParaLaRespuesta = usuarios.filter((usuario) => usuario.genero === genero.trim().toUpperCase());
    }

    const usuariosParaLaRespuestaJSON = JSON.stringify(usuariosParaLaRespuesta);

    response.send(usuariosParaLaRespuestaJSON);
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});