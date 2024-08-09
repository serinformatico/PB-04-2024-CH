import express from "express";
import cookieParser from "cookie-parser";
import paths from "./utils/paths.js";

import { config as dotenvConfig } from "dotenv";
import { connectDB } from "./config/mongoose.config.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configPassport } from "./config/passport.config.js";

import IngredientRouter from "./routers/api/ingredient.router.js";
import UserRouter from "./routers/api/user.router.js";
import RecipeRouter from "./routers/api/recipe.router.js";
import AuthRouter from "./routers/api/auth.router.js";
import HomeRouter from "./routers/home.router.js";

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
server.use("/api/auth", new AuthRouter().getRouter());
server.use("/api/ingredients", new IngredientRouter().getRouter());
server.use("/api/recipes", new RecipeRouter().getRouter());
server.use("/api/users", new UserRouter().getRouter());
server.use("/", new HomeRouter().getRouter());

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