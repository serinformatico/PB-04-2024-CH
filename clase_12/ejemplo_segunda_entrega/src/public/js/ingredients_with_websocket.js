const socket = io();

/* ********************** ELEMENTOS HTML *********************** */
const ulIngredientsList = document.getElementById("ingredients-list");
const ingredientsForm = document.getElementById("ingredients-form");
const inputIngredientId = document.getElementById("input-ingredient-id");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");

/* ************************** EVENTOS ************************** */
ingredientsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    form.reset();

    socket.emit("insert-ingredient", {
        name: formData.get("name"),
        description: formData.get("description"),
    });
};

btnDeleteIngredient.onclick = () => {
    const id = Number(inputIngredientId.value);
    inputIngredientId.value = "";

    if (id > 0) {
        socket.emit("delete-ingredient", { id });
    }
};

socket.on("ingredients-list", (data) => {
    const productsList = data.ingredients ?? [];
    ulIngredientsList.innerText = "";

    productsList.forEach((ingredient) => {
        const li = document.createElement("li");
        li.innerHTML = `<i>Id:</i> ${ingredient.id} - <i>Nombre:</i> ${ingredient.name}`;
        ulIngredientsList.append(li);
    });
});