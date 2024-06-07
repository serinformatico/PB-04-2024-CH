import FileSystem from "../utils/FileSystem.js";

export default class ShoppingCartManager {
    #filename;
    #fileSystem;
    #shoppingCarts;

    constructor() {
        this.#filename = "shopping-carts.json";
        this.#fileSystem = new FileSystem(this.#filename);
        this.#shoppingCarts = [];
    }

    persist = async (shoppingCart) => {
        const shoppingCartRegistered = await this.readOneId(shoppingCart.id);

        if (shoppingCartRegistered) {
            // En la grabación de la clase, la siguiente línea nos presentó
            // un error de referencia circular cuando se intentaba convertir
            // el objeto a JSON.
            // shoppingCartRegistered.products.push(shoppingCart.products);

            // La solución al problema anteriormente mensionado, es reemplazar
            // el push por una simple asignación.
            shoppingCartRegistered.products = shoppingCart.products;
        } else {
            this.#shoppingCarts.push(shoppingCart);
        }

        await this.#fileSystem.write(this.#shoppingCarts);
    };

    readAll = async () => {
        this.#shoppingCarts = await this.#fileSystem.read() ?? [];
        return this.#shoppingCarts;
    };

    readOneId = async (id) => {
        this.readAll();
        const shoppingCart = this.#shoppingCarts.find((shoppingCart) => shoppingCart.id === Number(id));

        return shoppingCart;
    };
}