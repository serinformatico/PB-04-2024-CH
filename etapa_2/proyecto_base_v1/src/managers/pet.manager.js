
import mongoose from "mongoose";
import Pet from "../models/pet.model.js";
import { isValidID } from "../config/mongoose.config.js";
import { ERROR_INVALID_ID, ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetManager {
    #pet;

    constructor () {
        this.#pet = Pet;
    }

    #validateId = (id) => {
        if (!isValidID(id)) {
            throw new Error(ERROR_INVALID_ID);
        }
    };

    #findById = async (id) => {
        const petFound = await this.#pet.findById(id);
        if (!petFound) {
            throw new Error(ERROR_NOT_FOUND_ID);
        }

        return petFound;
    };

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const petsFound = await this.#pet.find(filters).lean();
            return petsFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            this.#validateId(id);
            const petFound = await this.#findById(id);
            return petFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            const petCreated = new Pet(data);
            await petCreated.save();

            return petCreated;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data) => {
        try {
            this.#validateId(id);
            const petFound = await this.#findById(id);

            const newValues = {
                ...data,
            };

            petFound.set(newValues);
            await petFound.save();

            return petFound;
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    deleteOneById = async (id) => {
        try {
            this.#validateId(id);
            const petFound = await this.#findById(id);

            await this.#pet.findByIdAndDelete(id);

            return petFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}