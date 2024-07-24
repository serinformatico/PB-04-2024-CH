import { Router } from "express";

const router = Router();

const users = [
    {
        username: "juan",
        password: "1234",
    },
    {
        username: "maria",
        password: "4321",
    },
];

// Middleware para validar la sesión del usuario
const validateSession = (req, res, next) => {
    if(!req.session?.username) {
        return res.status(403).send("Este es un recurso privado exclusivo para usuarios registrados");
    }

    // Si está autenticado, continúa al siguiente middleware o ruta
    next();
};

// Ruta pública para la página principal
router.get("/", (req, res) => {
    // Si no hay usuario en sesión, muestra un mensaje de bienvenida
    if (!req.session?.username) {
        return res.status(200).send("Te damos la bienvenida");
    }

    // Si es la primera visita, inicializa el contador
    if (!req.session?.counter) {
        req.session.counter = 1;
        return res.status(200).send(`Bienvenido ${req.session.username}`);
    }

    // Incrementa el contador de visitas y muestra el mensaje correspondiente
    req.session.counter++;
    return res.status(200).send(`${req.session.username} visitaste la página ${req.session.counter} veces`);
});

// Ruta para acceder a un recurso privado
router.get("/private-resource", validateSession, (req, res) => {
    res.status(200).send("Accediste a un recurso privado");
});

// Ruta para iniciar sesión
// Para simplificar el ejemplo, esto se ha hecho con get pero debería ser un POST y req.body
// URI: http://localhost:8080/login?username=juan&password=1234
router.get("/login", (req, res) => {
    const { username, password } = req.query;
    const user = users.find((user) => user.username === username && user.password === password);

    if(!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
    }

    // Se guarda el nombre de usuario en la sesión
    req.session.username = user.username;
    res.status(200).send("Se ha iniciado la sesión");
});

// Ruta para cerrar sesión
router.get("/logout", (req, res) => {
    req.session.destroy();
    return res.status(200).send("Se ha cerrado la sesión");
});

export default router;