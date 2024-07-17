import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const recipeSchema = new Schema({
    observations: {
        type: String,
        trim: true,
        maxLength: [ 250, "Las observaciones deben tener como máximo 250 caracteres" ],
    },
    ingredients: [
        {
            ingredient: {
                type: Schema.Types.ObjectId,
                ref: "ingredients",
                required: [ true, "El nombre es obligatorio" ],
            },
            amount: {
                type: Number,
                required: [ true, "El nombre es obligatorio" ],
                min: [ 1, "La cantidad debe ser mayor que 0" ],
            },
        },
    ],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
recipeSchema.plugin(paginate);

const RecipeModel = model("recipes", recipeSchema);

export default RecipeModel;