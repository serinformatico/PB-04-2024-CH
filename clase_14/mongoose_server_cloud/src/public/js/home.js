const ulProductsList = document.getElementById("products-list");
const inputProductId = document.getElementById("input-product-id");
const btnProductDelete = document.getElementById("btn-product-delete");

const socket = io();

btnProductDelete.onclick = () => {
    const id = Number(inputProductId.value);

    if (id > 0) {
        socket.emit("product-delete", { id });
        inputProductId.value = "";
    }
};

socket.on("products-list", (data) => {
    const productsList = data.products ?? [];
    ulProductsList.innerText = "";

    productsList.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `id: ${product.id} - nombre: ${product.name} - stock: ${product.stock}`;
        ulProductsList.append(li);
    });
});