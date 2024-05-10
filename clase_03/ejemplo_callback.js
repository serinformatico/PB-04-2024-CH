/*
    Ejemplo de uso de callback
*/

function incrementarEn2(numero) {
    return numero + 2;
}

function incrementarNumeros(numeros, callback) {
    for (let i = 0; i < numeros.length; i++) {
        numeros[i] = callback(numeros[i]);
    }

    return numeros;
}

console.log("\nEJEMPLO: Uso de callback");
console.log(incrementarNumeros([10, 20, 30], incrementarEn2));