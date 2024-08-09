
import mongoose from "mongoose";
import Pet from "../models/pet.model.js";

import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetManager {
    #pet;

    constructor () {
        this.#pet = Pet;
    }

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
            const petFound = await this.#findById(id);

            await this.#pet.findByIdAndDelete(id);

            return petFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}