/*
    ACTIVIDAD EN CLASE: Carpeta public

    Partiendo del ejemplo anterior, recrear la estructura con un index.html
    para poder visualizarse en la ruta raíz.

    1. En este archivo deberá haber un formulario donde podremos ingresar una
       mascota a partir del método POST. Dicho POST conectará al endpoint raíz
       del router pets
    2. Configurar el router pets para que pueda recibir el json por parte del
       formulario (recordar express.json()  y express.urlencoded({extended:true}))
    3. Verificar con POSTMAN que la información llegue al servidor y se guarde
       correctamente.
*/

import express from "express";
import path from "path";

// Importación de enrutadores
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Esto decodifica el body que enviado por un formulario (application/x-www-form-urlencoded)
server.use(express.urlencoded({ extended: true }));

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(path.join("src", "public")));

// Declaración de enrutadores
server.use('/api/users', usersRouter);
server.use('/api/pets', petsRouter);

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});