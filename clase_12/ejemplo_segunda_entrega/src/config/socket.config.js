import { Server } from "socket.io";
import IngredientManager from "../managers/IngredientManager.js";

const ingredientManager = new IngredientManager();
let serverSocket = null;

const config = (serverHTTP) => {
    serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", async (socket) => {
        const ingredients = await ingredientManager.getAll();
        console.log("Socket connected");

        // Envía la lista de ingredientes al conectarse
        serverSocket.emit("ingredients-list", { ingredients });

        socket.on("insert-ingredient", async (data) => {
            await ingredientManager.insertOne(data);
            const ingredients = await ingredientManager.getAll();

            // Envía la lista de ingredientes actualizada después de insertar
            serverSocket.emit("ingredients-list", { ingredients });
        });

        socket.on("delete-ingredient", async (data) => {
            await ingredientManager.deleteOneById(Number(data.id));
            const ingredients = await ingredientManager.getAll();

            // Envía la lista de ingredientes actualizada después de eliminar
            serverSocket.emit("ingredients-list", { ingredients });
        });
    });
};

const updateIngredientsList = async () => {
    const ingredients = await ingredientManager.getAll();

    // Envía la lista de ingredientes actualizada
    serverSocket.emit("ingredients-list", { ingredients });
};

export default {
    config,
    updateIngredientsList,
};