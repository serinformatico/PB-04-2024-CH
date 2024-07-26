import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

// Opciones para el registro de usuarios
const registerOptions = {
    passReqToCallback: true, // Permite pasar el objeto de solicitud a la función de callback
    usernameField: "email", // Define el campo que se usará como nombre de usuario
};

// Opciones para el inicio de sesión
const loginOptions = {
    usernameField: "email", // Define el campo que se usará como nombre de usuario
};

// Método que maneja el registro de un nuevo usuario
const handleRegister = async (req, email, password, done) => {
    try {
        const newUser = await userManager.insertOne({ ...req.body, email, password });
        return done(null, newUser);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

// Método que maneja el inicio de sesión de un usuario
const handleLogin = async (email, password, done) => {
    try {
        const user = await userManager.getOneByEmailAndPassword(email, password);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

// Función para configurar Passport
export const configPassport = () => {
    // Definición de las estrategias
    passport.use("register", new LocalStrategy(registerOptions, handleRegister));
    passport.use("login", new LocalStrategy(loginOptions, handleLogin));

    // Serializa el usuario en la sesión
    passport.serializeUser((user, done) => {
        const sessionData = {
            id: user._id?.toString(),
            name: user.name,
        };
        done(null, sessionData);
    });

    // Deserializa el usuario a partir de los datos de la sesión
    passport.deserializeUser(async (sessionData, done) => {
        try {
            const user = await userManager.getOneById(sessionData.id);
            done(null, user);
        } catch (error) {
            done(error.message);
        }
    });
};