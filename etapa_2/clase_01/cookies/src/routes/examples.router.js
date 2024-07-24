import { Router } from "express";

const router = Router();

router.get("/set-cookie", (req, res) => {
    const options = {
        secure: true,
        maxAge: 10 * 1000, // 10 * 1000 mili-segundos = 10 segundos
        path: "/",
    };

    // 1° parámetro: nombre de la cookie (saludo).
    // 2° parámetro: valor de la cookie (Hola Mundo).
    // 3° parámetro: opciones de configuración de la cookie.
    res.cookie("saludo", "Hola Mundo", options );
    res.status(200).send("Se ha configurado la Cookie");
});

router.get("/get-cookie", (req, res) => {
    // Nombre de la cookie (saludo).
    const cookieValue = req.cookies.saludo;

    if (cookieValue) {
        return res.status(200).send(`Valor de la cookie: ${cookieValue}`);
    }

    res.status(200).send("Cookie no encontrada.");
});

router.get("/set-cookie-signed", (req, res) => {
    /*
        Firmar una cookie proporciona seguridad adicional al asegurar que su
        contenido no haya sido alterado por el cliente HTTP.

        En otras palabras, firmar una cookie con una clave secreta proporciona
        una capa adicional de seguridad al proteger la integridad de los datos
        que se almacenan en ella, asegurando que solo el servidor pueda modificar
        y verificar su contenido.
    */

    const options = {
        secure: true,
        maxAge: 10 * 1000,
        path: "/",
        signed: true,
    };

    res.cookie("saludoFirmado", "Hola Mundo", options );
    res.status(200).send("Se ha configurado y firmado la Cookie");
});

router.get("/get-cookie-signed", (req, res) => {
    const cookieValue = req.signedCookies.saludoFirmado;

    if (cookieValue) {
        return res.status(200).send(`Valor de la cookie: ${cookieValue}`);
    }

    res.status(200).send("Cookie no encontrada.");
});

router.get("/delete-cookie", async (req, res) => {
    res.clearCookie("saludo");
    res.status(200).send("Cookie saludo eliminada.");
});

export default router;