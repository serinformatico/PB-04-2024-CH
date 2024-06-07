/*
    1. Se declarará una clase Persona, la cual debe crearse con un nombre
    que identifique la instancia.
    2. Además, habrá una variable estática utilizable para todos.
    3. Se comprobará la individualidad entre las dos instancias.
*/

// Clase declarada
class Persona {

    // Propiedad pública de clase (estática)
    static especie = "Humano";

    // Constructor de instancia
    constructor(nombre, edad) {
        // Propiedades públicas de instancia
        this.nombre = nombre;
        this.edad = edad;
    }

    // Método público de instancia
    saludar = () => `¡Hola! Soy ${this.nombre} ${this.apellido} y soy ${Persona.especie}`;

    // Método público de clase (estático)
    static darBienvenida = () => `¡Bienvenidos!`;
}

// Instanciación o creación del objeto
let juan = new Persona("Juan", 21);
let lorena = new Persona("Lorena", 18);

console.log("\nEJEMPLO N°1: Instancias de la clase Persona");
console.log(juan);
console.log(lorena);

console.log("\nEJEMPLO N°2: Uso de métodos de cada instancia de la clase Persona");
console.log(juan.saludar());
console.log(lorena.saludar());

console.log("\nEJEMPLO N°3: Uso de miembros estáticos de la clase Persona");
console.log(Persona.especie);
console.log(Persona.darBienvenida());

console.log("\nEJEMPLO N°4: Mal uso de miembros estáticos de la clase Persona (ESTO ESTA MAL)");
console.log(juan.especie); // Imprime undefined
// console.log(juan.darBienvenida()); // Da error "is not a function"