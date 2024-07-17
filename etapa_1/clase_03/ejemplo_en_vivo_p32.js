/*
    Se creará una promesa, haciendo énfasis en los casos de
    resolución (resolve) y en los casos de rechazo (reject).
*/

const saludar = (nombre, apellido) => {
    return new Promise((resolve, reject) => {
        if (!nombre) {
            reject(new Error("Nombre indefinido"));
        }

        if (!apellido) {
            reject(new Error("Apellido indefinido"));
        }

        setTimeout(() => {
            resolve(`Hola ${nombre} ${apellido}`);
        }, 1000);
    });
};

saludar("juan")
    .then((response) => {
        console.log(response);
    }).catch((error) => {
        console.log(error.message);
    }).finally(() => {
        console.log("Me ejecuto al terminar la promesa sin importar el resultado");
    });

console.log("Este mensaje no espera a que se resuelva la promesa");