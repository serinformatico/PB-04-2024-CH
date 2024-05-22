/*
    1. Crear un servidor con el módulo nativo de nodejs "http". Setear una
       respuesta que contenga el mensaje "¡Mi primer hola mundo desde backend!"
    2. El servidor debe escuchar en el puerto 8080 (Correr con nodemon)
    3. Probar el servidor desde el navegador.
    4. Hacer algún cambio en código y corroborar que se reinicie automáticamente.
*/

const http = require("http");

const PORT = 8080;
const HOST = "localhost";

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "text/plain; charset=utf8");
    response.end("¡Mi primer hola mundo desde backend!");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});