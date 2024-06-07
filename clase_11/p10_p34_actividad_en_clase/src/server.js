/*
    EJEMPLO: Aplicación chat con websocket

    Como aprendimos la clase pasada, las aplicaciones de websocket son
    bastante amplias. Una de las mejores formas de comprender su aplicación,
    es realizando un chat comunitario.

    Nuestro chat comunitario contará con:
    1. Una vista que cuente con un formulario para poder identiﬁcarse. El
       usuario podrá elegir el nombre de usuario con el cual aparecerá en
       el chat.
    2. Un cuadro de input sobre el cual el usuario podrá escribir el mensaje.
    3. Un panel donde todos los usuarios conectados podrán visualizar los
       mensajes en tiempo real
    4. Una vez desarrollada esta aplicación, subiremos nuestro código a
       glitch.com, para que todos puedan utilizarlo.


    ACTIVIDAD EN CLASE: Chat websocket ampliado

    Con base en el servidor con chat de websocket que se ha desarrollado.
    Crear nuevos eventos para que:

    5. Cuando el usuario se autentique correctamente, elservidor le mande
       los logs de todo el chat.
    6. Cuando el usuario se autentique correctamente, todos los demás
       usuarios (menos el que se acaba de registrar) reciban una notiﬁcación
       indicando qué usuario se acaba de conectar. (utiliza Swal toast).
*/

import express from "express";
import paths from "./utils/paths.js";
import handlebars from "./config/handlebars.config.js";
import serverSocket from "./config/socket.config.js";
import homeRouter from "./routes/home.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Definición de enrutadores
server.use("/chat", homeRouter);

// Configuración del motor de plantillas
handlebars.config(server);

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

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
const serverHTTP = server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});

// Configuración del servidor de websocket
serverSocket.config(serverHTTP);