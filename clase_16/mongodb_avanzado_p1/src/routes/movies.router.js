import { Router } from "express";
import MovieModel from "../models/movie.model.js";

const router = Router();

router.get("/explain", async (req, res) => {
    const explanation = await MovieModel.find({ title: "Frankenstein" }).explain();

    console.log(explanation.executionStats);

    res.status(200).json({ status: true, payload: explanation });
});

export default router;