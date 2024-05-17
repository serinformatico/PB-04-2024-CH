/*
    El método setTimeout se utiliza para establecer un temporizador
    que ejecute una tarea después de un determinado tiempo.
*/

setTimeout(() => {
    // Este bloque se ejecutará despues haber transcurrido 1 seg.
    const saludo = "¡Hola Mundo!";
    console.log(saludo);
}, 1000); // Tiempo expresado en milisegundos 1000ms = 1s.

console.log("Bienvenidos");