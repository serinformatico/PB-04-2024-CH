/*
    HANDS ON LAB: Express Router

    ¿Cómo lo hacemos?

        Se crearán dos routers: users y pets.

        1. El router de users debe tener la ruta principal /api/users
        2. El router de pets debe tener la ruta principal /api/pets
        3. Ambos deben tener, de manera interna, un array para almacenarlos.
        4. Ambos deben contar con un método get en su ruta raíz para poder
           obtener el arreglo.
        5. Ambos deben contar con un método POST en su ruta raíz para poder
           agregar un usuario o mascota según sea el router.
        6. Conectar los routers al archivo app.js para tener listo el apuntador
           al router.
        7. Probar funcionalidad con Postman.
*/

import express from "express";

// Importación de enrutadores
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.json());

// Declaración de enrutadores
server.use('/api/users', usersRouter);
server.use('/api/pets', petsRouter);

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});