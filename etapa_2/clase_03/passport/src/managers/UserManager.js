
import mongoose from "mongoose";
import UserModel from "../models/user.model.js";
import mongoDB from "../config/mongoose.config.js";
import { createHash, isValidPassword } from "../utils/security.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
    ERROR_NOT_FOUND_EMAIL,
} from "../constants/messages.constant.js";

export default class UserManager {
    #userModel;

    constructor () {
        this.#userModel = UserModel;
    }

    #validateId = (id) => {
        if (!mongoDB.isValidID(id)) {
            throw new Error(ERROR_INVALID_ID);
        }
    };

    #findById = async (id) => {
        const userFound = await this.#userModel.findById(id);
        if (!userFound) {
            throw new Error(ERROR_NOT_FOUND_ID);
        }

        return userFound;
    };

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
            const filters = $and.length > 0 ? { $and } : {};

            const usersFound = await this.#userModel.find(filters).lean();
            return usersFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            this.#validateId(id);
            const userFound = this.#findById(id);
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneByEmailAndPassword = async (email, password) => {
        try {
            const userFound = await this.#userModel.findOne({ email });
            if (!userFound) {
                throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
            }

            const hash = userFound.password;

            if (!isValidPassword(password, hash)) {
                throw new Error(ERROR_NOT_FOUND_CREDENTIALS);
            }

            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            data.password = createHash(data.password);
            const userCreated = new UserModel(data);
            await userCreated.save();

            return userCreated;
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
            const userFound = this.#findById(id);

            const newValues = {
                ...data,
                password: data.password ? createHash(data.password) : data.password,
            };

            userFound.set(newValues);
            await userFound.save();

            return userFound;
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
            const userFound = this.#findById(id);

            await this.#userModel.findByIdAndDelete(id);

            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    resetPasswordByEmail = async (email, password) => {
        try {
            const userFound = await this.#userModel.findOne({ email });
            if (!userFound) {
                throw new Error(ERROR_NOT_FOUND_EMAIL);
            }

            userFound.set({ password: createHash(password) });
            await userFound.save();
            return userFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}