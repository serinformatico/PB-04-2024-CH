/*
    Ejemplo descomposición de función "map"

    Se hará descomposición de la función map para poder analizarla por
    dentro. El objetivo es localizar en qué punto la función "map" llamaría
    de manera interna el callback.
*/

const numeros = [10, 20, 30, 40, 50];

Array.prototype.miMap = function (callback) {
    const nuevoArray = [];

    for (let i = 0; i < this.length; i++) {
        const valor = this[i];
        let nuevoValor = callback(valor);
        nuevoArray.push(nuevoValor);
    }

    return nuevoArray;
}

const numerosIncrementadosEn2 = numeros.miMap((numero) => numero + 2);

console.log("\nEJEMPLO: Descomposición de la función map de JS");
console.log(numerosIncrementadosEn2);