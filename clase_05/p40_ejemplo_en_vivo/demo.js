/*
    Se realizará el mismo procedimiento del ejemplo 1, haciendo
    énfasis en los callbacks y cómo se manejan.
*/
const fs = require("fs");
const path = require("path");

const rutaDeArchivoEjemplo = path.join("files", "ejemplo.txt");

const demo = async () => {
    // Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
    await fs.promises.writeFile(rutaDeArchivoEjemplo, "¡Hola Mundo!");

    // Lee el contenido del archivo
    const contenido = await fs.promises.readFile(rutaDeArchivoEjemplo, "utf8");
    console.log("LECTURA N°1", contenido);

    // Agrega contenido al final del archivo.
    await fs.promises.appendFile(rutaDeArchivoEjemplo, " Bienvenidos");

    // Lee nuevamente el contenido del archivo.
    const contenidoActual = await fs.promises.readFile(rutaDeArchivoEjemplo, "utf8");
    console.log("LECTURA N°2", contenidoActual);

    // Elimina el archivo.
    await fs.promises.unlink(rutaDeArchivoEjemplo);
};

demo();