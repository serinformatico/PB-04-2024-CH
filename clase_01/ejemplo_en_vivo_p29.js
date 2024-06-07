/*
    Se declara una constante de tipo string.
    Intentamos cambiar el valor de dicha string.
    ¿Es posible?
    Respuesta: No, no se puede cambiar el valor de una constante de tipo de dato
    primitivo. Es inmutable.
*/

const SALUDO = "Hola";
// SALUDO = "Adiós"; // Da error "Assignment to constant variable"

const NUMERO_PI = 3.141592653589793;
// NUMERO_PI = 100; // Da error "Assignment to constant variable"

/*
    Se declara una constante de tipo Array<number>.
    Intentamos cambiar el último y el primer elemento.
    ¿Es posible? ¿Por qué?
    Respuesta: si, se puede cambiar el valor de una constante de tipo de dato
    especial(object y/o array). Son mutables las propiedades y métodos de un objeto
    y los elementos de una arreglo.
*/

const colores = ["rojo", "verde", "negro"];
colores.push("blanco");
console.log("\nEJEMPLO N°1: Uso de constantes mutables (array)");
console.log(colores);

const perro = { nombre: "Firulais", raza: "callejero" };
perro.anios = 3;
console.log("\nEJEMPLO N°2: Uso de constantes mutables (object)");
console.log(perro);
