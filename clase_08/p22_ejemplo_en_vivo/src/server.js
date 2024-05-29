/*
    Ejemplo archivos estáticos

    1. Se agregará una carpeta pública, la cual contendrá dentro una carpeta
       "img", donde guardaremos una imagen, desde el navegador se deberá
       acceder a este archivo a partir del servicio de archivos estáticos
    2. Crear una página index.html que contenga un mensaje de bienvenida
       y acceder desde la ruta raíz a éste.
*/

import express from "express";
import path from "path";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(path.join("src", "public")));

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});