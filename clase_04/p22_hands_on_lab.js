/*
    HANDS ON LAB: Práctica de módulo nativo: crypto

    ¿Cómo lo hacemos?

    Se creará una clase "UsersManager" que permitirá guardar usuarios en un
    atributo estático. El usuario se recibirá con una contraseña en string plano,
    y se deberá guardar la contraseña hasheada con crypto. Utilizar el módulo
    nativo crypto.

    El manager debe contar con los siguientes métodos:
        1. El método "Crear usuario" debe recibir un objeto con los campos:
            - Nombre
            - Apellido
            - Nombre de usuario
            - Contraseña
           El método debe guardar un usuario en un atributo estático llamado
           "Usuarios", recordando que la contraseña debe estar hasheada por
           seguridad.
        2. El método "Mostrar Usuarios" imprimirá en consola todos los usuarios
           almacenados.
        3. El método "Validar Usuario" recibirá el nombre de usuario que quiero
           validar, seguido de la contraseña,  debe poder leer el json previamente
           generado con el arreglo de usuarios y hacer la comparación de contraseñas,
           Si coinciden el usuario y la contraseña, devolver un mensaje "Logueado",
           caso contrario indicar error si el usuario no existe, o si la contraseña
           no coincide.

    Referencias de longitud de algoritmos:
        AES-128-CBC require una key de 16-bytes (128-bit).
        AES-192-CBC require una key de 24-bytes (192-bit).
        AES-256-CBC require una key de 32-bytes (256-bit).
*/

class UsersManager {
    static usuarios = [];

    #crypto;        // Módulo "crypto" de NodeJS
    #algorithm;     // Algoritmo de cifrado
    #key;           // Clave secreta para cifrar
    #iv;            // Vector de inicialización aleatorio

    constructor() {
        this.#crypto = require("crypto");
        this.#algorithm = "AES-256-CBC";
        this.#key = "miClaveSecretaDeEncriptacion2024"; // Importante: Debe tener una longitud de 32 caracteres.
        this.#iv = this.#crypto.randomBytes(16);
    }

    #encriptarTexto = (texto) => {
        const cifrador = this.#crypto.createCipheriv(this.#algorithm, this.#key, this.#iv);

        let textoEncriptado = cifrador.update(texto, "utf8", "hex");
        textoEncriptado += cifrador.final("hex");

        return textoEncriptado;
    }

    #desencriptarTexto = (textoEncriptado) => {
        const decifrador = this.#crypto.createDecipheriv(this.#algorithm, this.#key, this.#iv);

        let textoDesencriptado = decifrador.update(textoEncriptado, "hex", "utf8");
        textoDesencriptado += decifrador.final("utf8");

        return textoDesencriptado;
    }

    crearUsuario = (nombre, apellido, nombreDeUsuario, contrasenia) => {
        const nuevoUsuario = {
            nombre,
            apellido,
            nombreDeUsuario: nombreDeUsuario.trim(),
            contrasenia: this.#encriptarTexto(contrasenia.trim()),
        };

        UsersManager.usuarios.push(nuevoUsuario);
    }

    mostrarUsuarios = () => {
        console.log(UsersManager.usuarios);

        UsersManager.usuarios.forEach((usuario) => {
            console.log(`Contraseña desencriptada de ${usuario.nombre}: ${this.#desencriptarTexto(usuario.contrasenia)}`);
        });
    }

    validarUsuario = (nombreDeUsuario, contrasenia) => {
        const usuario = UsersManager.usuarios.find((usuario) => usuario.nombreDeUsuario === nombreDeUsuario.trim());

        if (!usuario) {
            console.log("El usuario no existe");
        } else if (usuario.contrasenia != contrasenia.trim()) {
            console.log("La contraseña no coincide");
        } else {
            console.log("Logueado");
        }
    }
}

const usuarios = new UsersManager();
usuarios.crearUsuario("Juan", "Perez", "juan2024", "juancito");
usuarios.crearUsuario("Lorena", "Medina", "lore2024", "lorenita");
usuarios.crearUsuario("Maria", "Pereyra", "mary2024", "123456");

usuarios.mostrarUsuarios();

usuarios.validarUsuario("lore2024", "lorenita");