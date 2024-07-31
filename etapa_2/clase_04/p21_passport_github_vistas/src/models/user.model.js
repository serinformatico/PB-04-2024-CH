import { Schema, model } from "mongoose";

// Determina si el campo 'surname', 'age' y 'email' es requerido
const isFieldRequired = function () {
    return this.isEnabled;
};

// Determina si el campo 'password' es requerido
const isPasswordRequired = function () {
    return !this.gitHubId;
};

// Determina si el campo 'gitHubId' es requerido
const isGitHubIdRequired = function () {
    return !this.password;
};

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    surname: {
        type: String,
        required: [ isFieldRequired, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    age: {
        type: Number,
        required: [ isFieldRequired, "La edad es obligatoria" ],
    },
    email: {
        type: String,
        required: [ isFieldRequired, "El email es obligatorio" ],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [ isPasswordRequired, "La contraseña es obligatoria" ],
        trim: true,
    },
    gitHubId: {
        type: String,
        required: [ isGitHubIdRequired, "El ID de GitHub es obligatorio" ],
    },
    isEnabled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt automáticamente
});

// Crear y exportar el modelo de usuario
const UserModel = model("User", userSchema);

export default UserModel;