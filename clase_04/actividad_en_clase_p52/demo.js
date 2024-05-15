/*
    ACTIVIDAD EN CLASE: Calculadora de edad

    Realizar un programa que utilice la dependencia momentjs (deberá instalarse
    por npm install).

        1. Debe contar con una variable que almacene la fecha actual
        2. Debe contar con una variable que almacene sólo la fecha de tu nacimiento
        3. Validar con un if que la variable contenga una fecha válida (utilizar
           el método isValid());
        4. Finalmente, mostrar por consola cuántos días han pasado desde que naciste
           hasta el día de hoy. (utilizar el método diff()
        5. Extra: Cambia tu moment a la versión 1.6.0, al no ser la misma versión
           mayor, nota el cambio al correr el programa.
*/

import moment from "moment";

const fechaActual = moment();
const fechaDeNacimiento = moment("1990-02-25"); // Una fecha inválida sería 1990-02-30

if (!fechaDeNacimiento.isValid()) {
    console.log("La fecha de nacimiento es inválida");
} else {
    const diasQueHanPasadoDesdeQueNaci = fechaActual.diff(fechaDeNacimiento, 'days');
    console.log(diasQueHanPasadoDesdeQueNaci);
}



