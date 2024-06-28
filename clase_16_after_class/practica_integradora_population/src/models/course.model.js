import { Schema, model } from "mongoose";

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
    },
    students: [{ type: Schema.Types.ObjectId, ref: "students" }],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

// Función para agregar este curso en los estudiantes
const addCoursesInStudent = async function (courseModel, studentModel) {
    await studentModel.updateMany(
        { _id: { $in: courseModel.students } },
        { $addToSet: { courses: courseModel._id } },
    );
};

// Función para eliminar este curso en los estudiantes
const removeCoursesInStudent = async function (courseModel, studentModel) {
    await studentModel.updateMany(
        { courses: courseModel._id },
        { $pull: { courses: courseModel._id } },
    );
};

// Middleware para actualizar la referencia en los estudiantes al crear/actualizar un curso
courseSchema.pre("save", async function(next) {
    const StudentModel = this.model("students");

    removeCoursesInStudent(this, StudentModel);
    addCoursesInStudent(this, StudentModel);
    next();
});

// Middleware para eliminar la referencia en los estudiantes al eliminar un curso
courseSchema.pre("findByIdAndDelete", async function(next) {
    const StudentModel = this.model("students");

    removeCoursesInStudent(this, StudentModel);
    next();
});

const CourseModel = model("courses", courseSchema);

export default CourseModel;