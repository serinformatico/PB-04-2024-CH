import { Router } from "express";

const router = Router();
const products = [
    { id: 1, name: "Pelota", stock: 10, price: 100 },
    { id: 2, name: "Zapato", stock: 20, price: 500 },
    { id: 3, name: "Zapatilla", stock: 5, price: 777 },
];

router.get("/", (req, res) => {
    res.send({ products });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const product = products.find((product) => product.id === Number(id));

    res.send({ product });
});

export default router;