import express from "express";
import cookieParser from "cookie-parser";
import paths from "./utils/paths.js";

import { config as dotenvConfig } from "dotenv";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configPassport } from "./config/passport.config.js";

import apiAuthRouter from "./routes/api/auth.routes.js";
import apiIngredientRouter from "./routes/api/ingredient.routes.js";
import apiRecipeRouter from "./routes/api/recipe.routes.js";
import apiUserRouter from "./routes/api/user.routes.js";
import homeRouter from "./routes/home.routes.js";

const server = express();

// Decodificadores del BODY
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Decodificadores de Cookies
server.use(cookieParser(process.env.SECRET_KEY));

// Declaración de ruta estática
server.use("/public", express.static(paths.public));

// Variables de entorno
dotenvConfig({ path: paths.env });

// Motor de plantillas
configHandlebars(server);

// Passport
configPassport(server);

// Conexión con la Base de Datos
connectDB();

// Enrutadores
server.use("/api/auth", apiAuthRouter);
server.use("/api/ingredients", apiIngredientRouter);
server.use("/api/recipes", apiRecipeRouter);
server.use("/api/users", apiUserRouter);
server.use("/", homeRouter);

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
server.listen(process.env.PORT, () => {
    console.log(`Ejecutándose en http://localhost:${process.env.PORT}`);
});