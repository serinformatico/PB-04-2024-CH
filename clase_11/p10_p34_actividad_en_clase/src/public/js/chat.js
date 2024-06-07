// Documentación de Sweetalert2: https://sweetalert2.github.io/#download

const socket = io();
const chatText = document.getElementById("chat-text");
let user = null;

// Modal que solicita el nombre para ingresar al chat.
// También, es quien disparar el evento "authenticated"
Swal.fire({
    title: "Identifícate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "¡Ingresá tu nombre de usuario para comenzar a chatear!";
    },
}).then((result) => {
    if (result.isConfirmed) {
        user = { name: result.value };
        socket.emit("authenticated", { user });
    }
});

// Evento que se dispara al oprimir la tecla "Enter" (envía el
// mensaje al servidor)
chatText.onkeyup = (event) => {
    if (event.key === "Enter") {
        if (chatText.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatText.value });
            chatText.value = "";
        }
    }
};

// Alerta que muestra cuando se ha conectado un nuevo usuario
socket.on("message-logs", (data) => {
    if (!user) return;

    const messageLogs = document.getElementById("message-logs");

    data.messages.forEach((message) => {
        const li = document.createElement("li");
        li.innerHTML = `${message.user.name} dice: <b>${message.message}</b>`;
        messageLogs.append(li);
    });
});

// Alerta que muestra cuando se ha conectado un nuevo usuario
socket.on("new-user-connected", (data) => {
    if (!user) return;

    Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        title: `${data.user.name} se ha unido al chat`,
        icon: "success",
    });
});