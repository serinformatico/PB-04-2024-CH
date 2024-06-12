import { Router } from "express";
import serverSocket from "../config/socket.config.js";
import products from "../products.js";

const router = Router();

router.post("/", (req, res) => {
    const { id, name, stock } = req.body;
    const product = { id, name, stock };
    products.push(product);

    serverSocket.updateProductsList(products);

    res.status(201).redirect("http://localhost:8080/home");
});

export default router;