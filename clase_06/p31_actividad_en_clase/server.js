/*
    ACTIVIDAD EN CLASE: Otras respuestas con express

    Crear un proyecto basado en express js, el cual cuente con un servidor
    que escuche en el puerto 8080. Además de configurar los siguientes
    endpoints:

    1. El endpoint del método GET a la ruta  "/bienvenida" deberá devolver
       un html con letras en color azul, en una string, dando la bienvenida.
    2. El endpoint del método GET a la ruta "/usuario" deberá devolver un
       objeto con los datos de un usuario falso: {nombre, apellido,edad, correo}
*/

import express from "express";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/bienvenida
server.get("/bienvenida", (request, response) => {
    response.send("<h1 style='color: blue;'>¡Bienvenidos!</h1>");
});

// Endpoint: Método que oye las solicitudes en la URL http://localhost:8080/usuario
server.get("/usuario", (request, response) => {
    const usuario = {
        nombre: "Juan",
        apellido: "Medina",
        edad: 20,
        correo: "juan@gmail.com"
    };

    const usuarioJSON = JSON.stringify(usuario);

    response.send(usuarioJSON);
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});