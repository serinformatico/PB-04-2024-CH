/*
    Usar validaciones con expresiones regulares directamente en la definición de la
    ruta presenta varias ventajas y desventajas:

    Ventajas
        - Validación Inmediata: La validación de la expresión regular se realiza
          directamente en la ruta, evitando que las peticiones con IDs inválidos
          lleguen a la lógica del controlador.
        - Simplicidad: Reduce la necesidad de middleware adicional para validar el
          ID, manteniendo el código más compacto y legible.
        - Eficiencia: Al filtrar peticiones inválidas de manera temprana, se reduce
          la carga de procesamiento en el servidor.

    Desventajas
        - Flexibilidad Reducida: Menor flexibilidad para manejar validaciones más
          complejas o múltiples validaciones secuenciales que podrían ser necesarias
          en algunos casos.
        - Mantenimiento: Las rutas con expresiones regulares pueden volverse difíciles
          de leer y mantener, especialmente si se agregan muchas reglas de validación.
        - Error Handling: El manejo de errores específicos puede ser menos claro o
          limitado en comparación con el uso de middleware dedicado para la validación
          y manejo de errores.
*/

import { Router } from "express";
import PetManager from "../../managers/pet.manager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../../constants/messages.constant.js";

const router = Router();
const petManager = new PetManager();

// Función para manejar errores
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

// Ruta para obtener todas las mascotas
router.get("/", async (req, res) => {
    try {
        const petsFound = await petManager.getAll(req.query);
        res.status(200).json({ status: true, payload: petsFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para obtener una mascota por su ID (validar id con expresión regular)
router.get("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const petFound = await petManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: petFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para crear una nueva mascota
router.post("/", async (req, res) => {
    try {
        const petCreated = await petManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: petCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para actualizar una mascota existente (validar id con expresión regular)
router.put("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const petUpdated = await petManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: petUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para eliminar una mascota por su ID (validar id con expresión regular)
router.delete("/:id([0-9a-fA-F]{24})", async (req, res) => {
    try {
        const petDeleted = await petManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: petDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;