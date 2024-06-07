/*
    ACTIVIDAD EN CLASE: Utilización ES6-ES9

    Descripción de la actividad.
    Dados los objetos indicados en la siguiente diapositiva:
        1. Realizar una lista nueva (array) que contenga todos los tipos
           de productos (no cantidades), consejo: utilizar Object.keys y
           Array.includes. Mostrar el array por consola.
        2. Posteriormente, obtener el total de productos vendidos por todos
           los objetos (utilizar Object.values).
*/

// Objetos indicados en la siguiente diapositiva:
const objetos = [
    {
        manzanas:3,
        peras:2,
        carne:1,
        jugos:5,
        dulces:2
    },
    {
        manzanas:1,
        sandias:1,
        huevos:6,
        jugos:1,
        panes:4
    },
];

console.log("\nEJEMPLO N°1: Tipos de productos");
const tiposDeProductosDelObjetoA = Object.keys(objetos[0]);
const tiposDeProductosDelObjetoB = Object.keys(objetos[1]);
const tiposDeProductos = [ ...tiposDeProductosDelObjetoA, ...tiposDeProductosDelObjetoB];
console.log(tiposDeProductos);
console.log(tiposDeProductos.includes("peras"));
console.log(tiposDeProductos.includes("sandias"));

console.log("\nEJEMPLO N°2: Total de productos vendidos");
const cantidadesDeProductosDelObjetoA = Object.values(objetos[0]);
const cantidadesDeProductosDelObjetoB = Object.values(objetos[1]);
const sumarCantidades = (...cantidades) => {
    let total = 0;

    cantidades.forEach((cantidad) => {
        total += Number(cantidad);
    });

    return total;
};
console.log(sumarCantidades(...cantidadesDeProductosDelObjetoA, ...cantidadesDeProductosDelObjetoB));


