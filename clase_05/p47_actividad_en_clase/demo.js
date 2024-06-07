/*
    ACTIVIDAD EN CLASE: Lectura y escritura de archivos

    Escribir un programa ejecutable bajo node.js que realice las
       siguientes acciones:
        1. Abra una terminal en el directorio del archivo y ejecute la
          instrucción: npm init -y. Esto creará un archivo especial
          (lo veremos más adelante) de nombre package.json.
        2.- Lea el archivo package.json y declare un objeto con el siguiente
          formato y datos:
            const info = {
                contenidoStr: (contenido del archivo leído en formato string),
                contenidoObj: (contenido del archivo leído en formato objeto),
                size: (tamaño en bytes del archivo)
            }
        3. Muestre por consola el objeto info luego de leer el archivo.
        4. Guardar el objeto info en un archivo llamado info.json dentro de la
           misma carpeta de package.json.
        5. Incluir el manejo de errores (con throw new Error).
        6. Utilizar el módulo promises de fs dentro de una función async/await
           y utilizar JSON.stringify + JSON.parse para poder hacer las
           transformaciones json->objeto y viceversa.
*/

const fs = require("fs");

const rutaDelArchivoPackageJSON = "./package.json";

const leerArchivo = async (ruta) => {
    try {
        return await fs.promises.readFile(ruta, "utf8");
    } catch (error) {
        throw new Error("Error al leer el archivo.");
    }
};

const escribirArchivo = async (ruta, contenido) => {
    try {
        await fs.promises.writeFile(ruta, contenido);
    } catch (error) {
        throw new Error("Error al escribir el archivo.");
    }
};

const probar = async () => {
    const contenido = await leerArchivo(rutaDelArchivoPackageJSON);

    const info = {
        contenidoStr: JSON.stringify(contenido, null, "\t"),
        contenidoObj: JSON.parse(contenido),
        size: new Blob([contenido]).size
    };

    console.log(info);

    await escribirArchivo("./info.json", JSON.stringify(info, null, "\t"));
};

probar();