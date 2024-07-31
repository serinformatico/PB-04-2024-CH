import { Schema, model } from "mongoose";

const userSchema = new Schema({
    fullName: {
        type: String,
        required: [ true, "El nombre y apellido es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    gitHubId: {
        type: String,
        required: [ true, "El ID de GitHub es obligatorio" ],
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt automáticamente
});

// Crear y exportar el modelo de usuario
const UserModel = model("User", userSchema);

export default UserModel;