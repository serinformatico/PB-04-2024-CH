/*
    Instalación y configuración de MULTER
*/

import express from "express";
import path from "path";
import uploader from "./utils/uploader.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(path.join("src", "public")));

server.post("/api/uploader", uploader.single("thumbnail"), (req, res) => {
    const { file } = req;

    if (!file) {
        return res.status(400).send({ status: "error", message: "Sin archivo" });
    }

    res.send({ status: "success" });
});

// Método oyente de solicitudes
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});