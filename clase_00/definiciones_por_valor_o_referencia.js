// Definición de variables por valor
let a = 1;
let b = a;
a = 10;
console.log(b);


// Definición de variables por referencia
const personaA = { nombre: "Juan" };
const personaB = personaA;
personaA.nombre = "Lorena";
console.log(personaB);