import { Server } from "socket.io";

const config = (serverHTTP) => {
    const serverIO = new Server(serverHTTP);

    // Define un evento oyente (connection) que se dispara cuando
    // se establece la conexión.
    serverIO.on("connection", (socket) => {
        const id = socket.client.id;
        console.log("Conexión establecida", id);

        // Define un evento oyente (saludo) que se dispara cuando
        // se emite un saludo.
        socket.on("saludo", (data) => {
            console.log(data.message);

            // Define un evento emisor (saludo-respuesta) que se
            // dispara al recibir un saludo
            serverIO.emit("saludo-respuesta", { message: "Hola Cliente" });
        });

        // Define un evento oyente (disconnect) que se dispara
        // cuando se genera la desconexión.
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente");
        });
    });
};

export default { config };