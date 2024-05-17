/*
    El método setInterval ejecuta una tarea cada vez que se
    cumpla un intervalo de tiempo.
*/
let contador = 0;

const intervalo = setInterval(() => {
    // Este bloque se ejecutará despues haber transcurrido 1 seg.
    contador++;
    console.log(`¡Hola Mundo! Cuenta ${contador}`);

    if (contador === 3) {
        // Este método detiene el intervalo
        clearInterval(intervalo);
    }
}, 1000); // Tiempo expresado en milisegundos 1000ms = 1s.

console.log("Bienvenidos");