import { Server } from "socket.io";
import IngredientManager from "../managers/IngredientManager.js";
import FileSystem from "../utils/FileSystem.js";
import paths from "../utils/paths.js";
import { generateNameForFile } from "../utils/random.js";

const ingredientManager = new IngredientManager();
const fileSystem = new FileSystem();
let serverSocket = null;

const config = (serverHTTP) => {
    serverSocket = new Server(
        serverHTTP,
        {
            maxHttpBufferSize: 5e6, // Permitir archivos hasta 5MB (por defecto es 1MB)
        },
    );

    serverSocket.on("connection", async (socket) => {
        const response = await ingredientManager.getAll({ limit: 100 });
        console.log("Socket connected");

        // Envía la lista de ingredientes al conectarse
        serverSocket.emit("ingredients-list", response);

        socket.on("insert-ingredient", async (data) => {
            if (data?.file) {
                const filename = generateNameForFile(data.file.name);
                await fileSystem.write(paths.images, filename, data.file.buffer);

                await ingredientManager.insertOne(data, filename);
                const response = await ingredientManager.getAll({ limit: 100 });

                //Envía la lista de ingredientes actualizada después de insertar
                serverSocket.emit("ingredients-list", response);
            }
        });

        socket.on("delete-ingredient", async (data) => {
            await ingredientManager.deleteOneById(data.id);
            const response = await ingredientManager.getAll({ limit: 100 });

            // Envía la lista de ingredientes actualizada después de eliminar
            serverSocket.emit("ingredients-list", response);
        });
    });
};

const updateIngredientsList = async () => {
    const response = await ingredientManager.getAll({ limit: 100 });

    // Envía la lista de ingredientes actualizada
    serverSocket.emit("ingredients-list", { response });
};

export default {
    config,
    updateIngredientsList,
};