/*
    ACTIVIDAD EN CLASE: Servidor con GET, POST, PUT, DELETE

    Dada la frase: “Frase inicial”, realizar una aplicación que contenga un
    servidor en express, el cual cuente con los siguientes métodos:
        1. GET '/api/frase': devuelve un objeto que como campo "frase"
           contenga la frase completa
        2. GET '/api/palabras/:pos': devuelve un objeto como campo "buscada"
           contenga la palabra hallada en la frase en la posición dada (considerar
           que la primera palabra es la #1).
        3. POST '/api/palabras': recibe un objeto con una palabra bajo el campo
           "palabra" y la agrega al final de la frase. Devuelve un objeto que
           como campo "agregada" contenga la palabra agregada, y en el campo
           "pos" la posición en que se agregó dicha palabra.
        4. PUT '/api/palabras/:pos': recibe un objeto con una palabra bajo el
           campo "palabra" y reemplaza en la frase aquella hallada en la posición
           dada. Devuelve un objeto como campo "actualizada" contenga la nueva
           palabra, y en el campo "anterior" la anterior.
        5. DELETE '/api/palabras/:pos': elimina una palabra en la frase, según la
           posición dada (considerar que la primera palabra tiene posición #1).
        6. Utilizar POSTMAN para probar funcionalidad
*/

import express from "express";

const server = express();
const PORT = 8080;
const HOST = "localhost";
let frase = "Frase inicial";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/frase
// Devuelve un JSON con la propiedad "frase" y el valor "Frase inicial".
server.get('/api/frase', (req, res) => {
    res.send({ frase });
})

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/palabras/2
// En caso de exito, devuelve un JSON con la propiedad "palabra" y el valor "inicial".
server.get('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params;

    if (isNaN(pos)) {
        return res.status(400).send({ status: "error", message: "Pos debe ser un número entero" })
    }

    const posEntero = parseInt(pos);
    const indice = posEntero - 1;
    const palabras = frase.split(' ');

    if (posEntero <= 0 || posEntero > palabras.length) {
        return res.status(400).send({ status: "error", message: "Posición fuera del rango" })
    }

    const palabra = palabras[indice];

    res.send({ palabra });
})

// Endpoint: Método POST que escucha en la URL http://localhost:8080/api/palabras
// En caso de exito, devuelve un JSON con dos propiedades "palabra" y "pos".
server.post('/api/palabras', (req, res) => {
    const { palabra } = req.body;
    frase += ` ${palabra}`;

    const palabras = frase.split(' ');

    res.send({ palabra, pos: palabras.length });
})

// Endpoint: Método PUT que escucha en la URL http://localhost:8080/api/palabras/2
// En caso de exito, devuelve un JSON con dos propiedades "actualizada" y "anterior".
server.put('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params;
    const { palabra } = req.body;

    if (isNaN(pos)) {
        return res.status(400).send({ status: "error", message: "Pos debe ser un número entero" })
    }

    const posEntero = parseInt(pos);
    const indice = posEntero - 1;
    const palabras = frase.split(' ');

    if (posEntero <= 0 || posEntero > palabras.length) {
        return res.status(400).send({ status: "error", message: "Posición fuera del rango" })
    }

    const anterior = palabras[indice];
    palabras[indice] = palabra;
    frase += ` ${palabra}`;

    res.send({ actualizada: palabra, anterior })
})

// Endpoint: Método DELETE que escucha en la URL http://localhost:8080/api/palabras/2
// En caso de exito, devuelve un JSON con dos propiedades "status" y "eliminada".
server.delete('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params;

    if (isNaN(pos)) {
        return res.status(400).send({ status: "error", message: "Pos debe ser un número entero" })
    }

    const posEntero = parseInt(pos);
    const indice = posEntero - 1;
    const palabras = frase.split(' ');

    if (posEntero <= 0 || posEntero > palabras.length) {
        return res.status(400).send({ status: "error", message: "Posición fuera del rango" })
    }

    const palabraEliminada = palabras[indice];
    palabras.splice(indice, 1);
    frase = palabras.join(' ');

    res.send({ status: "success", eliminada: palabraEliminada })
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});