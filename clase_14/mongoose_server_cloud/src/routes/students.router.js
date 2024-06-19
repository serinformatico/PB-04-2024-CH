import { Router } from "express";
import StudentModel from "../models/student.model.js";

const router = Router();

router.get("/", async (req, res) => {
    const students = await StudentModel.find(filters);
    res.status(200).json({ status: true, payload: students });
});

router.get("/:id", async (req, res) => {
    const student = await StudentModel.findById(req.params.id);
    res.status(200).json({ status: true, payload: student });
});

export default router;