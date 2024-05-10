
class TicketManager {
    #eventos;
    #precioBaseDeGanancia;

    constructor() {
        this.#eventos = [];
        this.#precioBaseDeGanancia = 0.15;
    }

    #generarId = () => {
        let maxId = 0;

        this.#eventos.forEach((evento) => {
            if (evento.id > maxId) {
                maxId = evento.id;
            }
        });

        return maxId + 1;
    }

    agregarEvento = (nombre, lugar, precio, capacidad = 50, fecha = new Date().toLocaleDateString()) => {
        const id = this.#generarId();

        const evento = {
            id,
            nombre,
            lugar,
            precio: precio + precio * this.#precioBaseDeGanancia,
            capacidad,
            fecha,
            participantes: [],
        };

        this.#eventos.push(evento);
    }

    getEventos = () => {
        return this.#eventos;
    };

    #getEvento = (idEvento) => {
        const index = this.#eventos.findIndex((evento) => evento.id === idEvento);

        if (index < 0) {
            return console.log("Id de evento incorrecto");
        }

        return this.#eventos[index];
    }

    agregarUsuario = (idEvento, idUsuario) => {
        const evento = this.#getEvento(idEvento);
        const estaRegistradoElUsuario = evento.participantes.includes(idUsuario);

        if (estaRegistradoElUsuario) {
            return "Id de usuario ya registrado";
        }

        return evento.participantes.push(idUsuario);
    };

    ponerEventoEnGira = (idEvento, localidad, fecha) => {
        const evento = this.#getEvento(idEvento);
        const nuevoEvento = { ...evento, id: this.#generarId(), lugar: localidad, fecha };

        return this.#eventos.push(nuevoEvento);
    };

}

const eventoA = new TicketManager();
eventoA.agregarEvento("Evento A", "Mendoza", 150000);
eventoA.agregarEvento("Evento B", "Cordoba", 75000);
eventoA.agregarEvento("Evento C", "Bs As", 75000);
eventoA.agregarUsuario(2, 15);
eventoA.agregarUsuario(2, 30);
eventoA.ponerEventoEnGira(3, "San Luis", new Date(2024, 5, 16).toLocaleDateString())

console.log(eventoA.getEventos());