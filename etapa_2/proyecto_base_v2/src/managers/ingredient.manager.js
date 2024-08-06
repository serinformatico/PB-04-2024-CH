import mongoose from "mongoose";
import Ingredient from "../models/ingredient.model.js";
import { isValidID } from "../config/mongoose.config.js";
import { convertToBoolean } from "../utils/converter.js";
import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class IngredientManager {
    #ingredient;

    constructor() {
        this.#ingredient = Ingredient;
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

    // Busca un ingrediente por su ID.
    #findOneById = async (id) => {
        this.#validateId(id);

        const ingredientFound = await this.#ingredient.findOne({ _id: id });
        if (!ingredientFound) throw new Error(ERROR_NOT_FOUND_ID);

        return ingredientFound;
    };

    // Obtiene todos los ingredientes con filtros y paginación opcional.
    getAll = async (paramFilters) => {
        try {
            const $and = [];

            // Aplica filtro por título si se proporciona.
            if (paramFilters?.title) {
                $and.push({ title: { $regex: paramFilters.title, $options: "i" } });
            }

            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            // Opciones de paginación y ordenación.
            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };

            // Consulta paginada de ingredientes.
            const ingredientsFound = await this.#ingredient.paginate(filters, paginationOptions);
            return ingredientsFound;
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Obtiene un ingrediente por su ID.
    getOneById = async (id) => {
        try {
            const ingredientFound = await this.#findOneById(id);
            return ingredientFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Inserta un nuevo ingrediente en la base de datos.
    insertOne = async (data) => {
        try {
            const ingredient = new Ingredient({
                ...data,
                status: convertToBoolean(data.status),
            });

            await ingredient.save();
            return ingredient.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Actualiza un ingrediente existente por su ID.
    updateOneById = async (id, data) => {
        try {
            const ingredientFound = await this.#findOneById(id);

            const newValues = {
                ...data,
                status: convertToBoolean(data.status),
            };

            ingredientFound.set(newValues);
            await ingredientFound.save();

            return ingredientFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };

    // Elimina un ingrediente por su ID.
    deleteOneById = async (id) => {
        try {
            const ingredientFound = await this.#findOneById(id);

            await this.#ingredient.deleteOne({ _id: ingredientFound._id });
            return ingredientFound.toObject();
        } catch (error) {
            this.#handleError(error);
        }
    };
}