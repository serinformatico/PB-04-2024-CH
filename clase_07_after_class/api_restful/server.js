import express from "express";
import { usuarios, generarId } from "./usuarios.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/usuarios/1
// Obtener usaurios. Se puede filtrar opcionalmente por "género"
server.get('/api/usuarios/:idUsuario', (req, res) => {
    const { genero } = req.query;

    if (genero) {
        const usuariosFiltrados = usuarios.filter((item) => item.genero === genero.trim().toUpperCase());

        if (usuariosFiltrados.length === 0) {
            return res.status(400).send({ status: "error", message: "No se encontro ningún usuario con ese genero" });
        }

        return res.status(200).send({ status: "success", payload: usuariosFiltrados });
    }


    res.status(200).send({ status: "success", payload: usuarios });
});

// Endpoint: Método GET que escucha en la URL http://localhost:8080/api/usuarios/1
// Obtener un usuario por id.
server.get('/api/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const usuario = usuarios.find((usuario) => usuario.id === Number(idUsuario));

    if (!usuario) {
        return res.status(400).send({ status: "error", message: "Usuario no encontrado" });
    }

    return res.status(200).send({ status: "success", payload: usuario });
});

// Endpoint: Método POST que escucha en la URL http://localhost:8080/api/usuarios
// Crear un nuevo usuario.
server.post('/api/usuarios', (req, res) => {
    const { nombre, apellido, edad, correo, genero } = req.body;

    if (!nombre || !apellido || !edad || !correo || !genero) {
        return res.status(400).send({ status: "error", message: "Datos incompletos" });
    }

    // Esto agrega el usuario en el array
    usuarios.push({ id: generarId(), nombre, apellido, edad, correo, genero });

    return res.status(201).send({ status: "success", message: "El usuario se ha creado" });
});

// Endpoint: Método PUT que escucha en la URL http://localhost:8080/api/usuarios/2
// Modificar un usuario por id.
server.put('/api/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const { nombre, apellido, edad, correo, genero } = req.body;
    const indice = usuarios.findIndex((usuario) => usuario.id === Number(idUsuario));

    if (indice < 0) {
        return res.status(400).send({ status: "error", message: "Usuario no encontrado" });
    }

    if (!nombre || !apellido || !edad || !correo || !genero) {
        return res.status(400).send({ status: "error", message: "Datos incompletos" });
    }

    // Esto reemplaza el usuario en el array
    usuarios[index] = { id: Number(idUsuario), nombre, apellido, edad, correo, genero };

    return res.status(200).send({ status: "success", message: "El usuario se ha modificado" });
});

// Endpoint: Método DELETE que escucha en la URL http://localhost:8080/api/usuarios/2
// Eliminar un usuario por id.
server.delete('/api/usuarios/:idUsuario', (req, res) => {
    const { idUsuario } = req.params;
    const indice = usuarios.findIndex((usuario) => usuario.id === Number(idUsuario));

    if (indice < 0) {
        return res.status(400).send({ status: "error", message: "Usuario no encontrado" });
    }

    // Esto elimina al usuario del array
    usuarios.splice(indice, 1);

    return res.status(200).send({ status: "success", message: "El usuario se ha eliminado" });
});

// Método que responde a las URL inexistentes
server.use("*", (req, res) => {
    return res.status(404).send("<h1>Error 404</h1><p>Recurso no encontrado</p>");
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});