const SUMAR = "+";
const RESTAR = "-";
const MULTIPLICAR = "*";
const DIVIDIR = "/";

const calcular = async (operacion, a, b) => {
    const { default: Calculadora } = await import("./calculadora.js");
    const calculadora = new Calculadora();
    let resultado = 0;

    switch (operacion) {
        case SUMAR:
            resultado = calculadora.sumar(a, b);
            break;
        case RESTAR:
            resultado = calculadora.restar(a, b);
            break;
        case MULTIPLICAR:
            resultado = calculadora.multiplicar(a, b);
            break;
        case DIVIDIR:
            resultado = calculadora.dividir(a, b);
            break;
    }

    console.log(resultado);
};

const resultado = calcular(SUMAR, 10, 15);