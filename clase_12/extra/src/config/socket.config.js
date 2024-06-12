import { Server } from "socket.io";
import products from "../products.js";

let serverSocket = null;

const config = (serverHTTP) => {
    serverSocket = new Server(serverHTTP);

    serverSocket.on("connection", (socket) => {
        console.log("Socket connected");

        // Envía la lista de productos al conectarse
        serverSocket.emit("products-list", { products });

        socket.on("product-delete", (data) => {
            const index = products.findIndex((product) => Number(product.id) === Number(data.id));
            products.splice(index, 1);

            // Envía la lista de productos actualizada después de eliminar
            serverSocket.emit("products-list", { products });
        });
    });
};

const updateProductsList = (products) => {
    // Envía la lista de productos actualizada
    serverSocket.emit("products-list", { products });
};

export default {
    config,
    updateProductsList,
};