import { Router } from "express";
import users from "../users.js";
import food from "../food.js";

const router = Router();

router.get("/", (req, res) => {
    const randomID = Math.floor(Math.random() * users.length);
    const user = users[randomID];
    const isAdmin = user.role === "admin";

    res.render("users", { title: "Usuarios", isAdmin, food });
});

export default router;