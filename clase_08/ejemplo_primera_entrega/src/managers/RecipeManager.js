import FileSystem from "../utils/FileSystem.js";

export default class RecipeManager {
    #filename;
    #fileSystem;

    constructor() {
        this.#filename = "recipes.json";
        this.#fileSystem = new FileSystem(this.#filename);
    }

    #generateId = (recipes) => {
        let highestID = 0;

        recipes.forEach((recipe) => {
            if (recipe.id > highestID) {
                highestID = recipe.id;
            }
        });

        return highestID + 1;
    };

    getAll = async () => {
        return await this.#fileSystem.read() ?? [];
    };

    getOneById = async (id) => {
        const recipes = await this.getAll();
        const recipe = recipes.find((item) => item.id === id);

        return recipe;
    };

    insertOne = async (data) => {
        const recipes = await this.getAll();

        const recipe = { id: this.#generateId(recipes), ...data };
        recipes.push(recipe);
        await this.#fileSystem.write(recipes);

        return recipe;
    };

    updateOneById = async (id, data) => {
        const recipes = await this.getAll();
        const recipe = recipes.find((item) => item.id === id);

        recipe.ingredients = data.ingredients;
        recipe.observations = data.observations;
        await this.#fileSystem.write(recipes);

        return recipe;
    };

    deleteOneById = async (id) => {
        const recipes = await this.getAll();
        const index = recipes.findIndex((item) => item.id === id);

        recipes.splice(index, 1);
        await this.#fileSystem.write(recipes);
    };
}