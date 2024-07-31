import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import UserManager from "../managers/UserManager.js";
import { config as configSession } from "../config/session.config.js";

const userManager = new UserManager();

// Opciones de configuración de GitHub
const getGithubOptions = () => {
    return {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    };
};

// Busca o crea un usuario a partir del perfil de GitHub
const findOrCreateUser = async (profile) => {
    try {
        const user = await userManager.getOneByGitHubId(profile);
        return user;
    } catch (error) {
        const newUser = await userManager.insertOne({ fullName: profile.displayName, gitHubId: profile.id });
        return newUser;
    }
};

// Manejar la autenticación con GitHub
const handleAuthenticationGithub = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreateUser(profile);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

// Configurar Passport con la estrategia de GitHub
export const config = (server) => {
    // Definición de la estrategia
    passport.use("github", new GitHubStrategy(getGithubOptions(), handleAuthenticationGithub));

    // Serializa el usuario en la sesión
    passport.serializeUser((user, done) => {
        const sessionData = {
            id: user._id,
        };

        done(null, sessionData);
    });

    // Deserializa el usuario a partir de los datos de la sesión
    passport.deserializeUser(async (sessionData, done) => {
        try {
            if (!sessionData.id) return done(null, sessionData);
            const user = await userManager.getOneById(sessionData.id);
            done(null, user);
        } catch (error) {
            done(error.message);
        }
    });

    configSession(server); // Configura las sesiones en el servidor
    server.use(passport.initialize()); // Middleware para inicializa Passport
    server.use(passport.session()); // Middleware para usar sesiones de Passport
};