import { Schema, model } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
    },
    specie: {
        type: String,
        required: [ true, "La especie es obligatoria" ],
        uppercase: true,
        trim: true,
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

const PetModel = model("pets", petSchema);

export default PetModel;