import { Router } from "express";
import UserModel from "../models/user.model.js";

const router = Router();

router.get("/explain", async (req, res) => {
    const explanation = await UserModel.find({ $and: [{ firstName: "Lionel" }, { lastName: "Messi" }] }).explain();

    console.log(explanation.executionStats);

    res.status(200).json({ status: true, payload: explanation });
});

router.get("/", async (req, res) => {
    const users = await UserModel.fi();

    // Ejemplo de como usar populate sin el middleware "pre" el cual se declara dentro del model.
    // const users = await UserModel.find().populate("favoriteMovies");

    res.status(200).json({ status: true, payload: users });
});

router.post("/", async (req, res) => {
    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({ status: true, payload: user });
});

export default router;