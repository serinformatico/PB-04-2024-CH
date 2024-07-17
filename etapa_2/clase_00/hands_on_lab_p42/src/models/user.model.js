import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
    name: {
        index: { name: "idx_name" }, // Índice simple regular.
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    age: {
        type: Number,
        min: [ 18, "La edad debe ser igual o mayor que 18"],
        max: [ 100, "La edad debe ser igual o menor que 100"],
    },
    email: {
        unique: true, // Índice simple único.
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

const UserModel = model("users", ingredientSchema);

export default UserModel;