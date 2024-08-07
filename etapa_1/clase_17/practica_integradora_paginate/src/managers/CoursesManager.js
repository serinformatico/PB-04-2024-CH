
import mongoose from "mongoose";
import CourseModel from "../models/course.model.js";
import mongoDB from "../config/mongoose.config.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

export default class CoursesManager {
    #courseModel;

    constructor () {
        this.#courseModel = CourseModel;
    }

    getAll = async (paramFilters) => {
        try {
            const $and = [];

            if (paramFilters?.name) $and.push({ name:  paramFilters.name });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { name: 1 },
                desc: { name: -1 },
            };

            const paginationOptions = {
                limit: paramFilters.limit ?? 10,
                page: paramFilters.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                populate: "students",
                lean: true,
            };

            const coursesFound = await this.#courseModel.paginate(filters, paginationOptions);
            return coursesFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    getOneById = async (id) => {
        try {
            if (!mongoDB.isValidID(id)) {
                throw new Error(ERROR_INVALID_ID);
            }

            const courseFound = await this.#courseModel.findById(id).populate("students");

            if (!courseFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            return courseFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };

    insertOne = async (data) => {
        try {
            data.startDate = data.start_date;
            data.endDate = data.end_date;
            const courseCreated = new CourseModel(data);

            await courseCreated.save();

            return courseCreated;
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

            const courseFound = await this.#courseModel.findById(id);

            if (!courseFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            courseFound.name = data.name;
            courseFound.startDate = data.start_date;
            courseFound.endDate = data.end_date;
            courseFound.students = data.students;
            await courseFound.save();

            return courseFound;
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

            const courseFound = await this.#courseModel.findById(id);

            if (!courseFound) {
                throw new Error(ERROR_NOT_FOUND_ID);
            }

            await this.#courseModel.findByIdAndDelete(id);

            return courseFound;
        } catch (error) {
            throw new Error(error.message);
        }
    };
}