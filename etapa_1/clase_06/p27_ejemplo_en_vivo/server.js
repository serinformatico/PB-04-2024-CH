/*
    1. Estructurar un servidor basado en express, el cual escuche peticiones
       en el puerto 8080
    2. Realizar una función para el método GET en la ruta "/saludo", el cual
       responderá con "¡Hola a todos, pero ahora desde express!"
    3. Ejecutar con nodemon y probar en el navegador el endpoint generado
*/

import express from "express";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/saludo
server.get("/saludo", (request, response) => {
    response.send("¡Hola a todos, pero ahora desde express!");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});