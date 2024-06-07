/*
    - Validación de cadena con trim
    - Aplanado de Array con múltiple anidación
*/

// El método trim() elimina los espacios iniciales y finales de un string
const saludo = "   Hola Mundo  ";
const saludoSanetizado = saludo.trim();
console.log(saludoSanetizado);

// El método flat() aplana un array que contiene otros arrays
const numeros = [10, [-1, -2], 20, 50, [1, 5, [100, 200, 300]]];
const numerosAplanados = numeros.flat(2);
console.log(numerosAplanados);