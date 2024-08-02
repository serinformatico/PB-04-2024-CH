import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import UserManager from "../managers/UserManager.js";

const userManager = new UserManager();

const extractCookie = (req) => {
    if (req.cookies) {
        return req.cookies["cookieToken"];
    }

    return null;
};

const getJwtOptions = () => {
    return {
        jwtFromRequest: ExtractJwt.fromExtractors([extractCookie]),
        secretOrKey: process.env.SECRET_KEY,
    };
};

// Método que maneja el inicio de sesión de un usuario
const handleLogin = async (payload, done) => {
    try {
        const user = await userManager.getOneById(payload.id);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

// Función para configurar Passport
export const config = (server) => {
    // Definición de la estrategia
    passport.use("jwt", new JwtStrategy(getJwtOptions(), handleLogin));

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

    server.use(passport.initialize());
};