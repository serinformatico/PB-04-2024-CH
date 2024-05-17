/*
    Se profundizará sobre la sintaxis de las operaciones
    síncronas de archivos con fs.
*/
const fs = require("fs");
const path = require("path");

const rutaDeArchivoEjemplo = path.join("files", "ejemplo.txt");

// Crea el archivo "ejemplo.txt" y escribe "¡Hola Mundo!".
fs.writeFileSync(rutaDeArchivoEjemplo, "¡Hola Mundo!");

if (fs.existsSync(rutaDeArchivoEjemplo)) {
    // Lee el contenido del archivo
    const contenido = fs.readFileSync(rutaDeArchivoEjemplo, "utf8");
    console.log("LECTURA N°1", contenido);

    // Agrega contenido al final del archivo.
    fs.appendFileSync(rutaDeArchivoEjemplo, " Bienvenidos");

    // Lee nuevamente el contenido del archivo.
    const contenidoActual = fs.readFileSync(rutaDeArchivoEjemplo, "utf8");
    console.log("LECTURA N°2", contenidoActual);

    // Elimina el archivo.
    fs.unlinkSync(rutaDeArchivoEjemplo);
}