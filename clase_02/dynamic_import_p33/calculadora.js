/*
    Dynamic Import requiere de la inicialización de un proyecto de NodoJS.
    Esto se hace desde la terminal con el comando: npm init -y
    Luego, se debe entrar al package.json y agregar la siguiente key-value:
        "type": "module",


    ES6 Modules: es una característica de javascript que permite importar
    y exportar módulos por medio de las declaraciones "import" y "export".
*/

class Calculadora {
    sumar = (a, b) => a + b;
    restar = (a, b) => a - b;
    multiplicar = (a, b) => a * b;
    dividir = (a, b) => a / b;
}

// Se exporta por defecto la clase Calculadora
export default Calculadora;