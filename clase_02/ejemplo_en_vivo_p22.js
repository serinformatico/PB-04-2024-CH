/*
    Utilización básica de operador rest y operador spread en los objetos.

    * Operador spread: se utiliza para agregar, modificar o eliminar elementos
      de un arreglo o propiedades y/o métodos de un objeto. También, se usa
      para fusionar objetos y arreglos.
    * Parámetros rest: se utiliza para representar un número indefinido de
      parámetros como un arreglo en una función.

    La forma de distinguilos es:
    - Cuando los ... están dentro de un destructuring o en el llamado de una
      función o en la definición de una variable, se llama "operador spread"
      y tiene como finalidad modificar la estructura de un array u objeto.
    - Cuando los ... se encuentran al final de los parámetros de una función,
      se le llama "parámetros rest". Esto significa que reune el resto de la
      lista de parámetros en un array.
*/

let cliente = {
    nombre: "Juan",
    edad: 25,
};

// Modificar el valor de la edad y agregar la propiedad "tieneNacionalidadArgentina":
console.log("\nEJEMPLO N°1: Uso del operador spread");
cliente = { ...cliente, edad: 22, tieneNacionalidadArgentina: true}
console.log(cliente);

// Modificar el valor de la edad:
console.log("\nEJEMPLO N°2: Uso del operador spread dentro de un destructuring para modificar propiedad");
cliente = { ...cliente, edad: 30}
console.log(cliente);

// Eliminar la propiedad "edad":
console.log("\nEJEMPLO N°3: Uso del operador spread dentro de un destructuring para eliminar propiedad");
const { edad, ...clienteSinEdad } = cliente;
console.log(clienteSinEdad);

// Fusionar objetos:
console.log("\nEJEMPLO N°4: Uso del operador spread para fusionar objetos");
const domicilio = {
    calle: "Av. Siempreviva",
    pais: "ARGENTINA",
};
const clienteConDomicilio = { ...cliente, ...domicilio };
console.log(clienteConDomicilio);

console.log("\nEJEMPLO N°5: Uso de Paramétros Rest");
const sumarTodo = (valorInicial, ...numeros) => {
    let total = valorInicial;

    numeros.forEach((numero) => {
        total += Number(numero);
    });

    console.log(total);
}
sumarTodo(0, 10, 5, 3);
sumarTodo(10, 2, 8);
sumarTodo(100, 10, 5, 7, 3, 5);