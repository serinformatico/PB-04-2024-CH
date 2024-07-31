import express from "express";
import passport from "passport";

const router = express.Router();

// Ruta para iniciar la autenticación con GitHub
router.get("/github", passport.authenticate("github"));

// Ruta de callback para continuar con la autenticación de GitHub
router.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/github/login-failure",
    successRedirect: "/github/login-success",
}));

export default router;