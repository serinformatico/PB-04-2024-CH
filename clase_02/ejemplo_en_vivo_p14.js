/*
    Utilización del operador exponencial y manejo de array con includes.
*/

const resultadoDosAlCubo = 2**3;
console.log("\nEJEMPLO N°1: Uso del operador exponencial");
console.log(resultadoDosAlCubo);

const colores = ["rojo", "verde", "negro"];
const incluyeEsteElemento = colores.includes("rojo");
console.log("\nEJEMPLO N°2: Uso del método includes para arrays");
console.log("El color rojo está en el array de colores: ", incluyeEsteElemento);

const color = "blanco";
if (colores.includes(color)) {
    console.log(`Color ${color} encontrado`);
} else {
    console.log(`Color ${color} No encontrado`);
}