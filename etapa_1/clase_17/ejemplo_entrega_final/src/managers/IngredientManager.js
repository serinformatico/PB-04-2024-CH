
import mongoose from "mongoose";
import IngredientModel from "../models/ingredient.model.js";
import mongoDB from "../config/mongoose.config.js";
import FileSystem from "../utils/FileSystem.js";
import paths from "../utils/paths.js";
import { convertToBoolean } from "../utils/converter.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class IngredientManager {
    #ingredientModel;
    #fileSystem;

    constructor () {
        this.#ingredientModel = IngredientModel;
        this.#fileSystem = new FileSystem();
    }

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
            if (paramFilters?.category) $and.push({ category: paramFilters.category });
            if (paramFilters?.availability) $and.push({ availability: convertToBoolean(paramFilters.availability) });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { name: 1 },
                desc: { name: -1 },
            };

            const paginationOptions = {
                limit: paramFilters?.limit ?? 5,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };

            const ingredientsFound = await this.#ingredientModel.paginate(filters, paginationOptions);
            return ingredientsFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const ingredientFound = await this.#ingredientModel.findById(id).lean();

            if (!ingredientFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            return ingredientFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data, filename) => {
        try {
            const ingredientCreated = new IngredientModel(data);
            ingredientCreated.availability = convertToBoolean(data.availability);
            ingredientCreated.thumbnail = filename ?? null;
            await ingredientCreated.save();

            return ingredientCreated;
        } catch (error) {
            if (filename) await this.#fileSystem.delete(paths.images, filename);

            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data, filename) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const ingredientFound = await this.#ingredientModel.findById(id);
            const currentThumbnail = ingredientFound.thumbnail;
            const newThumbnail = filename;

            if (!ingredientFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            ingredientFound.name = data.name;
            ingredientFound.description = data.description;
            ingredientFound.category = data.category;
            ingredientFound.availability = convertToBoolean(data.availability);
            ingredientFound.thumbnail = newThumbnail ?? currentThumbnail;
            await ingredientFound.save();

            if (filename && newThumbnail != currentThumbnail) {
                await this.#fileSystem.delete(paths.images, currentThumbnail);
            }

            return ingredientFound;
        } catch (error) {
            if (filename) await this.#fileSystem.delete(paths.images, filename);

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

            const ingredientFound = await this.#ingredientModel.findById(id);

            if (!ingredientFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            await this.#ingredientModel.findByIdAndDelete(id);
            await this.#fileSystem.delete(paths.images, ingredientFound.thumbnail);

            return ingredientFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}