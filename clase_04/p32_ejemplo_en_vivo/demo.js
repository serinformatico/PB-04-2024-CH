/*
    Instalando nuestra primera dependencia

    La dependencia "moment" es una herramienta utilizada para manipular, validar
    y mostrar fechas y horas en JavaScript. La misma, facilita la gestión de
    fechas y horas, lo que puede ser un área complicada en JavaScript debido a
    la variedad de formatos y comportamientos de las fechas en diferentes entornos
    y zonas horarias. Página oficial: https://momentjs.com/
*/

import moment from "moment";

const fechaDeHoy = moment();
const horaActual = moment().h;
const fechaEnEspecifico = moment("2022-01-17");
const fechaDeHoyMenosUnDia = moment().subtract(1, "day");
const fechaDeHoyMasDosDias = moment().add(2, "day");
const fechaDeHoyFormateada = moment().format("DD-MM-YYYY");
const horaActualFormateada = moment().format("HH:mm:ss");
const diferenciaEnDiasEntreFechas = fechaDeHoy.diff(fechaEnEspecifico, 'days');
const diferenciaEnAniosEntreFechas = fechaDeHoy.diff(fechaEnEspecifico, 'years');

console.log("Fecha y hora de hoy (object)", fechaDeHoy);
console.log("Fecha y hora en específico (object)", fechaEnEspecifico);
console.log("Fecha y hora de hoy menos un día (object)", fechaDeHoyMenosUnDia);
console.log("Fecha y hora de hoy más dos días (object)", fechaDeHoyMasDosDias);
console.log("Fecha actual formateada (string)", fechaDeHoyFormateada);
console.log("Hora actual formateada (string)", horaActualFormateada);
console.log("Diferencia en días entre fechas (number)", diferenciaEnDiasEntreFechas);
console.log("Diferencia en años entre fechas (number)", diferenciaEnAniosEntreFechas);