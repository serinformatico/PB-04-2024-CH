import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    surname: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
        trim: true,
    },
    role: {
        type: String,
        required: [ true, "El rol es obligatorio" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt automáticamente
});

// Crear y exportar el modelo de usuario
const UserModel = model("User", userSchema);

export default UserModel;