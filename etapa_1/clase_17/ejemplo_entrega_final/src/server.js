import express from "express";
import paths from "./utils/paths.js";
import mongoDB from "./config/mongoose.config.js";
import handlebars from "./config/handlebars.config.js";
import serverSocket from "./config/socket.config.js";
import homeRouter from "./routes/app/home.router.js";
import ingredientsRouter from "./routes/app/ingredients.router.js";
import recipesRouter from "./routes/app/recipes.router.js";
import ingredientsApiRouter from "./routes/api/ingredients.router.js";
import recipesApiRouter from "./routes/api/recipes.router.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Enrutadores
server.use("/", homeRouter);
server.use("/ingredients", ingredientsRouter);
server.use("/recipes", recipesRouter);
server.use("/api/ingredients", ingredientsApiRouter);
server.use("/api/recipes", recipesApiRouter);

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/public", express.static(paths.public));

// Configuración del motor de plantillas
handlebars.config(server);

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
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    mongoDB.connectDB();
});

// Configuración del servidor de websocket
serverSocket.config(serverHTTP);