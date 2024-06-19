import FileSystem from "../utils/FileSystem.js";

export default class IngredientManager {
    #filename;
    #fileSystem;

    constructor() {
        this.#filename = "ingredients.json";
        this.#fileSystem = new FileSystem(this.#filename);
    }

    #generateId = (ingredients) => {
        let highestID = 0;

        ingredients.forEach((ingredient) => {
            if (ingredient.id > highestID) {
                highestID = ingredient.id;
            }
        });

        return highestID + 1;
    };

    getAll = async () => {
        return await this.#fileSystem.read() ?? [];
    };

    getOneById = async (id) => {
        const ingredients = await this.getAll();
        const ingredient = ingredients.find((item) => item.id === id);

        return ingredient;
    };

    insertOne = async (data) => {
        const ingredients = await this.getAll();

        const ingredient = { id: this.#generateId(ingredients), ...data };
        ingredients.push(ingredient);
        await this.#fileSystem.write(ingredients);

        return ingredient;
    };

    updateOneById = async (id, data) => {
        const ingredients = await this.getAll();
        const ingredient = ingredients.find((item) => item.id === id);

        ingredient.name = data.name;
        ingredient.description = data.description;
        await this.#fileSystem.write(ingredients);

        return ingredient;
    };

    deleteOneById = async (id) => {
        const ingredients = await this.getAll();
        const index = ingredients.findIndex((item) => item.id === id);

        ingredients.splice(index, 1);
        await this.#fileSystem.write(ingredients);
    };
}