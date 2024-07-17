
import mongoose from "mongoose";
import RecipeModel from "../models/recipe.model.js";
import mongoDB from "../config/mongoose.config.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_INDEX,
} from "../constants/messages.constant.js";

export default class RecipeManager {
    #recipeModel;

    constructor () {
        this.#recipeModel = RecipeModel;
    }

    getAll = async (paramFilters) => {
        try {
            const sort = {
                asc: { name: 1 },
                desc: { name: -1 },
            };

            const paginationOptions = {
                limit: paramFilters?.limit ?? 5,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                populate: "ingredients.ingredient",
                lean: true,
            };

            const recipesFound = await this.#recipeModel.paginate({}, paginationOptions);

            return recipesFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id).populate("ingredients.ingredient").lean();
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            return recipeFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            const recipeCreated = new RecipeModel(data);
            await recipeCreated.save();

            return recipeCreated;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id);
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            recipeFound.observations = data.observations;
            recipeFound.ingredients = data.ingredients;
            await recipeFound.save();

            return recipeFound;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    deleteOneById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id);
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            await this.#recipeModel.findByIdAndDelete(id);

            return recipeFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    addOneIngredientByIdAndIngredientId = async (id, ingredientId, amount) => {
        try {
            if (!mongoDB.isValidID(id) || !mongoDB.isValidID(ingredientId)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id);
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            const currentIndex = recipeFound.ingredients.findIndex((ingredient) => ingredient.ingredient.toString() === ingredientId);
            if (currentIndex >= 0) {
                const ingredient = recipeFound.ingredients[currentIndex];
                ingredient.amount += amount;
                recipeFound.ingredients[currentIndex] = ingredient;
            } else {
                recipeFound.ingredients.push({ ingredient: ingredientId, amount });
            }

            await recipeFound.save();

            return recipeFound;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    removeOneIngredientByIdAndIngredientId = async (id, ingredientId, amount) => {
        try {
            if (!mongoDB.isValidID(id) || !mongoDB.isValidID(ingredientId)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id);
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            const currentIndex = recipeFound.ingredients.findIndex((ingredient) => ingredient.ingredient.toString() === ingredientId);
            if (currentIndex < 0) {
                throw new Error(ERROR_NOT_FOUND_INDEX);
            }

            const ingredient = recipeFound.ingredients[currentIndex];
            if (ingredient.amount > amount) {
                ingredient.amount -= amount;
                recipeFound.ingredients[currentIndex] = ingredient;
            } else {
                recipeFound.ingredients.splice(currentIndex, 1);
            }

            await recipeFound.save();

            return recipeFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    removeAllIngredientsById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const recipeFound = await this.#recipeModel.findById(id);
            if (!recipeFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            recipeFound.ingredients = [];
            await recipeFound.save();

            return recipeFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}