import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 25 caracteres" ],
    },
    surname: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El apellido debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El apellido debe tener como máximo 25 caracteres" ],
    },
    email: {
        type: String,
        unique: true,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        match: [ /^[a-z0-9.]+@[a-z0-9-]+.(com$|com.[a-z0-9]{2}$)/, "El email es inválido" ],
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("students").countDocuments({
                    _id: { $ne: this._id },
                    email,
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    thumbnail: {
        type: String,
        required: [ true, "La imagen es obligatoria" ],
        trim: true,
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    toJSON: { virtuals: true }, // Permite que los campos virtuales se incluyan en el JSON.
});

studentSchema.index({ name: 1, surname: 1 }, { name: "idx_name_surname" });

// RELACIÓN INVERSA 0:N - Es una relación virtual que sirva para incluir los cursos del estudiante.
studentSchema.virtual("courses", {
    ref: "courses",
    localField: "_id",
    foreignField: "students",
    justOne: false,
});

// Middleware para eliminar la referencia en los cursos al eliminar un estudiante.
studentSchema.pre("findByIdAndDelete", async function(next) {
    const CourseModel = this.model("courses");

    await CourseModel.updateMany(
        { students: this._id },
        { $pull: { students: this._id } },
    );

    next();
});

const StudentModel = model("students", studentSchema);

export default StudentModel;