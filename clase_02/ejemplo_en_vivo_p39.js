/*
    - Explicación de asignación de variable a partir de un nullish, para
      entender su diferencia con el operador OR ||
    - Explicación de una variable privada en una clase.
*/


class Persona {
    // Propiedades públicas
    name;
    surname;
    edad;

    // Propiedad privada: No se podrá ver o acceder desde afuera de la clase.
    #esMayorDeEdad;

    constructor(name, surname, edad) {
        this.name = name;
        this.surname = surname;
        this.edad = edad || 18;
        this.#esMayorDeEdad = this.#comprobarMayoriaDeEdad();
    }

    // Método privado: No se podrá ver o acceder desde afuera de la clase.
    #comprobarMayoriaDeEdad = () => {
        return this.edad >= 21;
    };

    // Método público
    getEsMayorDeEdad = () => {
        return this.#esMayorDeEdad;
    };
}

const persona1 = new Persona("Juan", "Perez", 20);
console.log(persona1);
console.log("Es mayor de edad: ", persona1.getEsMayorDeEdad());

// Operador Nullish ??: Reemplaza los valores null o undefined por valores por defecto.
const edadA = 0;
const colorA = "";
const paisA = null;
const saludoA = "Buen día";
let precioA;

const valorFinalA1 = edadA ?? 18;
const valorFinalA2 = colorA ?? "blanco";
const valorFinalA3 = paisA ?? "Argentina";
const valorFinalA4 = saludoA ?? "Hola Mundo";
const valorFinalA5 = precioA ?? 100.00;

console.log("Operador Nullish: ", valorFinalA1, valorFinalA2, valorFinalA3, valorFinalA4, valorFinalA5);

// Operador OR ||: Reemplaza los valores null, undefined, 0, "", false
// por valores por defecto.
const edadB = 0;
const colorB = "";
const paisB = null;
const saludoB = "Buen día";
let precioB;

const valorFinalB1 = edadB || 18;
const valorFinalB2 = colorB || "blanco";
const valorFinalB3 = paisB || "Argentina";
const valorFinalB4 = saludoB || "Hola Mundo";
const valorFinalB5 = precioB || 100.00;

console.log("Operador OR: ", valorFinalB1, valorFinalB2, valorFinalB3, valorFinalB4, valorFinalB5);
