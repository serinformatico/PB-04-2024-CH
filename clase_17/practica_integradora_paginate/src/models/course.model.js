import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const courseSchema = new Schema({
    name: {
        index: { name: "idx_name" },
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    startDate: {
        type: Date,
        required: [ true, "La fecha de inicio es obligatoria" ],
    },
    endDate: {
        type: Date,
        required: [ true, "La fecha de finalización es obligatoria" ],
        validate: {
            validator: function(endDate) {
                return endDate > this.startDate;
            },
            message: "La fecha de finalización debe ser posterior a la fecha de inicio",
        },
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    toJSON: { virtuals: true }, // Permite que los campos virtuales se incluyan en el JSON.
});

// RELACIÓN INVERSA 0:N - Es una relación virtual que sirva para incluir los estudiantes del curso.
courseSchema.virtual("students", {
    ref: "students", // Nombre de la collection externa
    localField: "_id", // Nombre del campo de referencia que esta en esta collection
    foreignField: "courses", // Nombre del campo de referencia que está en la collection externa
    justOne: false,
});

// Middleware que elimina la referencia en los estudiantes al eliminar el curso.
courseSchema.pre("findByIdAndDelete", async function(next) {
    const StudentModel = this.model("students");

    await StudentModel.updateMany(
        { courses: this._id },
        { $pull: { courses: this._id } },
    );

    next();
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
courseSchema.plugin(paginate);

const CourseModel = model("courses", courseSchema);

export default CourseModel;