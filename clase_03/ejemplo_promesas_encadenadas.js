/*
    Ejemplo de Encadenamiento de promesas
*/

const getNumero = (numero) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(numero);
        }, 1000);
    });
};

getNumero(10)
    .then((response) => {
        console.log("Respuesta de 1ra promesa: ", response);
        return response * 5;
    }).then((response) => {
        console.log("Respuesta de 2da promesa: ", response);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response * 2);
            }, 500);
        });
    }).then((response) => {
        console.log("Respuesta de 3ra promesa: ", response);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(response * 3);
            }, 1500);
        });
    }).then((response) => {
        console.log("Respuesta de 4ta promesa: ", response);
    });