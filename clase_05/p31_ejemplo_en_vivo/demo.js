/*
    Se realizará el mismo procedimiento del ejemplo 1, haciendo
    énfasis en los callbacks y cómo se manejan.
*/
const fs = require("fs");
const path = require("path");

const rutaDeArchivoEjemplo = path.join("files", "ejemplo.txt");

// Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
const escribir = () => {
    return fs.writeFile(rutaDeArchivoEjemplo, "¡Hola Mundo!", (error) => {
        if (error) {
            console.log('Error al escribir contenido en el archivo');
        }
    });
};

// Lee el contenido del archivo
const leer = () => {
    fs.readFile(rutaDeArchivoEjemplo, "utf8", (error, result) => {
        if (error) {
            console.log('Error al leer contenido en el archivo');
        }

        console.log("LECTURA N°1", result);
    });
};

// Agrega contenido al final del archivo.
const agregar = () => {
    fs.appendFile(rutaDeArchivoEjemplo, " Bienvenidos", (error) => {
        if (error) {
            console.log('Error al leer contenido en el archivo');
        }
    });
};

// Lee nuevamente el contenido del archivo.
const reLeer = () => {
    fs.readFile(rutaDeArchivoEjemplo, "utf8", (error, result) => {
        if (error) {
            console.log('Error al re-leer contenido en el archivo');
        }

        console.log("LECTURA N°2", result);
    });
};

// Elimina el archivo.
const eliminar = () => {
    fs.unlink(rutaDeArchivoEjemplo, (error) => {
        if (error) {
            console.log('Error al eliminar contenido en el archivo');
        }
    });
};

const demo = () => {
    escribir();
    leer();
    agregar();
    reLeer();
    eliminar();
};

demo();