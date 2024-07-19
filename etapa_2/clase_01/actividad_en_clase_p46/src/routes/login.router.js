import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).render("login");
});

router.get("/get-cookies", (req, res) => {
    const { name, email } = req.signedCookies;
    res.status(200).json({ name, email });
});

router.post("/", (req, res) => {
    const { name, email } = req.body;

    const options = {
        secure: true,
        maxAge: 10 * 1000,
        path: "/",
        signed: true,
    };

    res.cookie("name", name, options );
    res.cookie("email", email, options );
    res.status(200).json({ status: true, payload: "Se han configurado las Cookies" });
});

export default router;