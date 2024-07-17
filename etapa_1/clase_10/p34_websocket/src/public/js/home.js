const socket = io();

// Define un evento oyente (connect) que se dispara cuando se
// establece la conexión.
socket.on("connect", () => {
    console.log("Conectado al Server");
});

// Define un evento emisor (saludo) que se dispara automáticamente
socket.emit("saludo", { message: "Hola servidor" });

// Define un evento oyente (saludo-respuesta) que se dispara cuando
// se emite una respuesta al saludo.
socket.on("saludo-respuesta", (data) => {
    console.log(data.message);
});

// Define un evento oyente (disconnect) que se dispara cuando se
// genera la desconexión.
socket.on("disconnect", () => {
    console.log("Se desconecto el server");
});