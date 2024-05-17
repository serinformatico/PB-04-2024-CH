/*
    ACTIVIDAD EN CLASE: Almacenar fecha y hora

    1. Realizar un programa que cree un archivo en el cual escriba la
       fecha y la hora actual. Posteriormente leer el archivo y mostrar
       el contenido por consola.
    2. Utilizar el módulo fs y sus operaciones de tipo callback.
*/

const fs = require("fs");
const path = require("path");

const rutaDeArchivoEjemplo = path.join("files", "ejemplo.txt");
const fecha = new Date().toLocaleDateString();
const hora = new Date().toLocaleTimeString();

fs.writeFile(rutaDeArchivoEjemplo, `La fecha y hora actual es ${fecha} ${hora}`, (error) => {
    if (error) {
        console.log("Error al escribir el archivo.");;
    }
});

fs.readFile(rutaDeArchivoEjemplo, "utf8", (error, result) => {
    if (error) {
        console.log("Error al leer el archivo.");;
    }

    console.log(result);
});