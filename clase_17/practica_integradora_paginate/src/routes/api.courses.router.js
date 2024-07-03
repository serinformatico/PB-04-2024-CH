import { Router } from "express";
import CoursesManager from "../managers/CoursesManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const coursesManager = new CoursesManager();

router.get("/", async (req, res) => {
    try {
        const coursesFound = await coursesManager.getAll(req.query);
        res.status(200).json({ status: true, payload: coursesFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const courseFound = await coursesManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: courseFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const courseCreated = await coursesManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: courseCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const courseUpdated = await coursesManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: courseUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const courseDeleted = await coursesManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: courseDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;