/*
    Utilización de operadores nullish
*/

let a = 2;
let b = "Hola";
let c = null;
let d = false;
let e;

console.log("\nEJEMPLO N°1: Uso del operador nullish");
console.log(a ?? 10);
console.log(b ?? "Chau");
console.log(c ?? "Algo"); // Está null -> imprime el valor por defecto que es "Algo"
console.log(d ?? false);
console.log(e ?? 100); // Está undefined -> imprime el valor por defecto que es 100

/*
    Utilización de variables privadas
*/

class Cliente {

    // Propiedad privada de clase
    #saldo;

    constructor (nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
        this.#saldo = 0;
    }

    acreditar = (monto) => {
        this.#saldo += monto
    };

    debitar = (monto) => {
        this.#saldo -= monto
    };

    obtenerSaldo = () => this.#saldo;
}

console.log("\nEJEMPLO N°2: Uso de propiedades privadas en clases");
const pedro = new Cliente("Pedro", 25);
pedro.acreditar(1500);
pedro.acreditar(500);
pedro.debitar(700);
const saldo = pedro.obtenerSaldo();
console.log(saldo);