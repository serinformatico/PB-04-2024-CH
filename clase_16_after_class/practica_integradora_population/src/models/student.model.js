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
    courses: [{ type: Schema.Types.ObjectId, ref: "courses" }],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

studentSchema.index({ name: 1, surname: 1 }, { name: "idx_name_surname" });

// Función para agregar este estudiante en los cursos
const addStudentInCourses = async (studentModel, courseModel) => {
    await courseModel.updateMany(
        { _id: { $in: studentModel.courses } },
        { $addToSet: { students: studentModel._id } },
    );
};

// Función para eliminar este estudiante en los cursos
const removeStudentInCourses = async (studentModel, courseModel) => {
    await courseModel.updateMany(
        { students: studentModel._id },
        { $pull: { students: studentModel._id } },
    );
};

// Middleware para actualizar la referencia en los cursos al crear/actualizar un estudiante
studentSchema.pre("save", async function(next) {
    const CourseModel = this.model("courses");

    removeStudentInCourses(this, CourseModel);
    addStudentInCourses(this, CourseModel);
    next();
});

// Middleware para eliminar la referencia en los cursos al eliminar un estudiante
studentSchema.pre("findByIdAndDelete", async function(next) {
    const CourseModel = this.model("courses");

    removeStudentInCourses(this, CourseModel);
    next();
});

const StudentModel = model("students", studentSchema);

export default StudentModel;