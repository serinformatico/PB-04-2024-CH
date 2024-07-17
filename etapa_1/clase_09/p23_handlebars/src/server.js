import express from "express";
import handlebars from "express-handlebars";
import paths from "./utils/paths.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Declaración del motor de plantillas
server.engine("handlebars", handlebars.engine());
server.set("views", paths.views);
server.set("view engine", "handlebars");

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/api/public", express.static(paths.public));

// Endpoint de prueba
server.get("/api/saludo", (req, res) => {
    const person = {
        name: "Juan",
        surname: "Medina",
        age: 19,
        hoobies: [ "Futbol", "Ajedrez", "Cocinar" ],
    };

    const isOlder = person.age >= 18;

    res.render("home", { title: "Inicio", person, isOlder });
});

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
server.listen(PORT, () => {
    console.log(`Ejecutandose en http://${HOST}:${PORT}`);
});