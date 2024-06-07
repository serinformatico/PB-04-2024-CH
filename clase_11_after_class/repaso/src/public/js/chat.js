const socket = io();
const userName = document.getElementById("user");
const chatText = document.getElementById("message");
const chatLogs = document.getElementById("message-logs");

let user = null;

Swal.fire({
    title: "Identificate",
    input: "text",
    confirmButtonText: "Ingresar",
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && "ingresa tu nombre de usuario";
    },
}).then((result) => {
    user = { name: result.value };
    userName.innerText = user.name;
    socket.emit("authenticated", user);
});

chatText.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        socket.emit("message", { user, message: chatText.value });
    }
});

socket.on("message-logs", (data) => {
    chatLogs.innerHTML = "";

    data.messages.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `${item.user.name} dice: <b>${item.message}</b>`;
        chatLogs.append(li);
    });
});

socket.on("new-user", (data) => {
    Swal.fire({
        toast: true,
        position: "top-end",
        timer: 3000,
        timeProgressBar: true,
        title: `${data.name} se ha unido al chat`,
        icon: "success",
    });
});