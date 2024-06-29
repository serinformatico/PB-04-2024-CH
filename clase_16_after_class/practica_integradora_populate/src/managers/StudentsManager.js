
import mongoose from "mongoose";
import StudentModel from "../models/student.model.js";
import mongoDB from "../config/mongoose.config.js";
import fileSystem from "../utils/fileSystem.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class StudentsManager {
    #studentModel;

    constructor () {
        this.#studentModel = StudentModel;
    }

    getAll = async (paramFilters) => {
        try {
            const filters = {
                $and: [],
            };

            if (paramFilters?.name) filters.$and.push({ name:  paramFilters.name });
            if (paramFilters?.surname) filters.$and.push({ surname:  paramFilters.surname });
            if (paramFilters?.email) filters.$and.push({ email:  paramFilters.email });

            /*  El método lean() utiliza después del método find() para
                devolver los documentos como objetos JavaScript simples
                en lugar de instancias de un Model de Mongoose.
            */
            const studentsFound = await this.#studentModel.find(filters.$and.length > 0 ? filters : {}).populate("courses").lean();
            return studentsFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const studentFound = await this.#studentModel.findById(id).populate("courses");

            if (!studentFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            return studentFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data, file) => {
        try {
            const studentCreated = new StudentModel(data);
            studentCreated.thumbnail = file?.filename ?? null;

            await studentCreated.save();

            return studentCreated;
        } catch (error) {
            if (file) await fileSystem.deleteImage(file.filename);

            if (error instanceof mongoose.Error.ValidationError) {
                error.message = Object.values(error.errors)[0];
            }

            throw new Error(error.message);
        }
    };

    updateOneById = async (id, data, file) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const studentFound = await this.#studentModel.findById(id);
            const currentThumbnail = studentFound.thumbnail;
            const newThumbnail = file?.filename;

            if (!studentFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            studentFound.name = data.name;
            studentFound.surname = data.surname;
            studentFound.email = data.email;
            studentFound.thumbnail = newThumbnail ?? currentThumbnail;
            studentFound.courses = data.courses;

            await studentFound.save();

            if (file && newThumbnail != currentThumbnail) {
                await fileSystem.deleteImage(currentThumbnail);
            }

            return studentFound;
        } catch (error) {
            if (file) await fileSystem.deleteImage(file.filename);

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

            const studentFound = await this.#studentModel.findById(id);

            if (!studentFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            await this.#studentModel.findByIdAndDelete(id);
            await fileSystem.deleteImage(studentFound.thumbnail);

            return student;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}