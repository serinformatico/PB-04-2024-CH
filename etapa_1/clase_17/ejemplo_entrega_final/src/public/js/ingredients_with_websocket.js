const socket = io();

/* ********************** ELEMENTOS HTML *********************** */
const ingredientsTableRows = document.getElementById("ingredients-table-rows");
const ingredientsForm = document.getElementById("ingredients-form");
const inputIngredientId = document.getElementById("input-ingredient-id");
const btnDeleteIngredient = document.getElementById("btn-delete-ingredient");

/* ************************** EVENTOS ************************** */
ingredientsForm.onsubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const file = formData.get("file");

    if (file) {
        form.reset();

        socket.emit("insert-ingredient", {
            name: formData.get("name"),
            description: formData.get("description"),
            category: formData.get("category"),
            availability: Boolean(formData.get("availability")),
            file: {
                name: file.name,
                type: file.type,
                size: file.size,
                buffer: file,
            },
        });
    }
};

btnDeleteIngredient.onclick = () => {
    const id = inputIngredientId.value;
    inputIngredientId.value = "";

    if (id) {
        socket.emit("delete-ingredient", { id });
    }
};

socket.on("ingredients-list", (data) => {
    const productsList = data.docs ?? [];
    ingredientsTableRows.innerText = "";

    productsList.forEach((ingredient) => {
        const trIngredient = (`
            <td>${ingredient.id}</td>
            <td>${ingredient.name}</td>
        `);

        const tr = document.createElement("tr");
        tr.innerHTML = trIngredient;
        ingredientsTableRows.append(tr);
    });
});