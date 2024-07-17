/* ********************** ELEMENTOS HTML ************************ */
const ingredientsForm = document.getElementById("ingredients-form");
const inputIngredientId = document.getElementById("input-ingredient-id");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");

/* ************************ OPERACIONES ************************ */
// eslint-disable-next-line no-unused-vars
const addIngredient = async (recipeId, currentIngredientId) => {
    const options = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1 }),
    };

    await fetch(`/api/recipes/${recipeId}/ingredients/${currentIngredientId}`, options);
};

// eslint-disable-next-line no-unused-vars
const removeIngredient = async (recipeId, currentIngredientId) => {
    await fetch(`/api/recipes/${recipeId}/ingredients/${currentIngredientId}`, {
        method: "DELETE",
    });
};

// eslint-disable-next-line no-unused-vars
const removeAllIngredients = async (recipeId) => {
    await fetch(`/api/recipes/${recipeId}/ingredients`, {
        method: "DELETE",
    });
};

const createIngredient = async (data) => {
    await fetch("/api/ingredients", {
        method: "POST",
        body: data,
    });

    window.location.reload();
};

const deleteIngredient = async (id) => {
    await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
    window.location.reload();
};

/* ************************** EVENTOS ************************** */
if (ingredientsForm) {
    ingredientsForm.onsubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        form.reset();

        createIngredient(formData);
    };
}

if (btnDeleteIngredient) {
    btnDeleteIngredient.onclick = () => {
        const id = inputIngredientId.value;
        inputIngredientId.value = "";

        if (id) {
            deleteIngredient(id);
        }
    };
}