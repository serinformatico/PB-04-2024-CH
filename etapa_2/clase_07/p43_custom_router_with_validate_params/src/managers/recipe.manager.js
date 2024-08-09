import mongoose from "mongoose";
import Recipe from "../models/recipe.model.js";
import { isValidID } from "../config/mongoose.config.js";
import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_INDEX,
} from "../constants/messages.constant.js";

export default class RecipeManager {
    #recipe;

    constructor() {
        this.#recipe = Recipe;
    }

    // Maneja errores lanzados durante las operaciones de Mongoose.
    #handleError = (error) => {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new Error(Object.values(error.errors)[0].message);
        }
        throw new Error(error.message);
    };

    // Valida que el ID proporcionado sea válido.
    #validateId = (id) => {
        if (!isValidID(id)) throw new Error(ERROR_INVALID_ID);
    };

    // Busca una receta por su ID.
    #findOneById = async (id) => {
        this.#validateId(id);

        const recipeFound = await this.#recipe.findOne({ _id: id }).populate("ingredients.ingredient");
        if (!recipeFound) throw new Error(ERROR_NOT_FOUND_ID);

        return recipeFound;
    };

    // Obtiene todas las recetas con paginación opcional.
    getAll = async (paramFilters) => {
        try {
            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                populate: "ingredients.ingredient",
                lean: true,
            };

            // Consulta paginada de recetas.
            const recipesFound = await this.#recipe.paginate({}, paginationOptions);
            return recipesFound;
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Obtiene una receta por su ID.
    getOneById = async (id) => {
        try {
            const recipeFound = await this.#findOneById(id);
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Inserta una nueva receta en la base de datos.
    insertOne = async (data) => {
        try {
            const recipe = new Recipe(data);

            await recipe.save();
            return recipe.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Actualiza una receta existente por su ID.
    updateOneById = async (id, data) => {
        try {
            const recipeFound = await this.#findOneById(id);

            recipeFound.set(data);
            await recipeFound.save();
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Elimina una receta por su ID.
    deleteOneById = async (id) => {
        try {
            const recipeFound = await this.#findOneById(id);

            await this.#recipe.deleteOne({ _id: recipeFound._id });
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Añade un ingrediente a una receta existente.
    addOneIngredient = async (id, ingredientId, quantity) => {
        try {
            const recipeFound = await this.#findOneById(id);

            const currentIndex = recipeFound.ingredients.findIndex((item) => item.ingredient._id.toString() === ingredientId);
            if (currentIndex >= 0) {
                const ingredient = recipeFound.ingredients[currentIndex];
                ingredient.quantity += quantity;
                recipeFound.ingredients[currentIndex] = ingredient;
            } else {
                recipeFound.ingredients.push({ ingredient: ingredientId, quantity });
            }

            await recipeFound.save();
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Elimina una cantidad específica de un ingrediente de una receta.
    removeOneIngredient = async (id, ingredientId, quantity) => {
        try {
            const recipeFound = await this.#findOneById(id);

            const currentIndex = recipeFound.ingredients.findIndex((item) => item.ingredient._id.toString() === ingredientId);
            if (currentIndex < 0) {
                throw new Error(ERROR_NOT_FOUND_INDEX);
            }

            const ingredient = recipeFound.ingredients[currentIndex];
            if (ingredient.quantity > quantity) {
                ingredient.quantity -= quantity;
                recipeFound.ingredients[currentIndex] = ingredient;
            } else {
                recipeFound.ingredients.splice(currentIndex, 1);
            }

            await recipeFound.save();
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Elimina todos los ingredientes de una receta.
    removeAllIngredients = async (id) => {
        try {
            const recipeFound = await this.#findOneById(id);

            recipeFound.ingredients = [];
            await recipeFound.save();
            return recipeFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };
}