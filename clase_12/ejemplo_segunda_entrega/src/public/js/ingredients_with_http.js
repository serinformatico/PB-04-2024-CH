/* ********************** ELEMENTOS HTML ************************ */
const ulIngredientsList = document.getElementById("ingredients-list");
const btnRefreshIngredientsList = document.getElementById("btn-refresh-ingredients-list");
const ingredientsForm = document.getElementById("ingredients-form");
const inputIngredientId = document.getElementById("input-ingredient-id");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");

/* ************************ OPERACIONES ************************ */
const loadIngredientsList = async () => {
    const response = await fetch("/api/ingredients", { method: "GET" });
    const data = await response.json();
    const productsList = data.payload;

    ulIngredientsList.innerText = "";

    productsList.forEach((ingredient) => {
        const li = document.createElement("li");
        li.innerHTML = `<i>Id:</i> ${ingredient.id} - <i>Nombre:</i> ${ingredient.name}`;
        ulIngredientsList.append(li);
    });
};

const createIngredient = async (data) => {
    await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    await loadIngredientsList();
};

const deleteIngredient = async (id) => {
    await fetch(`/api/ingredients/${id}`, { method: "DELETE" });
    loadIngredientsList();
};

/* ************************** EVENTOS ************************** */
btnRefreshIngredientsList.onclick = () => {
    loadIngredientsList();
};

ingredientsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    form.reset();

    createIngredient({
        name: formData.get("name"),
        description: formData.get("description"),
    });
};

btnDeleteIngredient.onclick = () => {
    const id = Number(inputIngredientId.value);
    inputIngredientId.value = "";

    if (id > 0) {
        deleteIngredient(id);
    }
};

// Se ejecuta para cargar la lista de ingredientes al ingresar o refrescar
loadIngredientsList();