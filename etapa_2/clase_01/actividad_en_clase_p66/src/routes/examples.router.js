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

// Middleware de autenticación
const validateSession = (req, res, next) => {
    if(!req.session?.username) {
        return res.status(401).send("Este es un recurso privado exclusivo para usuarios registrados");
    }

    next();
};

// URI: http://localhost:8080
router.get("/", (req, res) => {
    if (!req.session?.username) {
        return res.status(200).send("Te damos la bienvenida");
    }

    if (!req.session?.counter) {
        req.session.counter = 1;
        return res.status(200).send(`Bienvenido ${req.session.username}`);
    }

    req.session.counter++;
    return res.status(200).send(`${req.session.username} visitaste la página ${req.session.counter} veces`);
});

// URI: http://localhost:8080/private-endpoint
router.get("/private-endpoint", validateSession, (req, res) => {
    res.status(200).send("Accediste a un recurso privado");
});

// Para simplificar el ejemplo, esto se ha hecho con get pero debería ser un POST y req.body
// URI: http://localhost:8080/login?username=juan&password=1234
router.get("/login", (req, res) => {
    const { username, password } = req.query;
    const user = users.find((user) => user.username === username && user.password === password);

    if(!user) {
        return res.status(401).json({ message: "Usuario o contraseña incorrecta" });
    }

    req.session.username = user.username;
    res.status(200).send("Se ha iniciado la sesión");
});

// URI: http://localhost:8080/logout
router.get("/logout", (req, res) => {
    req.session.destroy();
    return res.status(200).send("Se ha cerrado la sesión");
});

export default router;