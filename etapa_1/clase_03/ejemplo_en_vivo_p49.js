/*
    - Explicación sobre el uso de una función asíncrona aplicando async/await.
    - Usaremos la misma promesa de dividir con la que hemos estado trabajando
      a lo largo de la clase.
*/

const division = (numero1, numero2) => new Promise((resolve, reject) => {
    let resultado = numero1 / numero2;

    if (resultado < 0) {
        reject('La calculadora sólo debe devolver valores positivos');
    }

    resolve(resultado);
});

const calcular = async () => {
    const numero1 = 5;
    const numero2 = 3;

    try {
        let resultadoDivision = await division(numero1, numero2);
        console.log(resultadoDivision);
    } catch (error) {
        console.error(error);
    }
};

calcular();