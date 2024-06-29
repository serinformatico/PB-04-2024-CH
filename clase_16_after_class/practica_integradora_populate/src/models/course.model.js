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
    // RELACIÓN FÍSICA 0:N
    students: [{
        type: Schema.Types.ObjectId,
        ref: "students",
    }],
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
});

const CourseModel = model("courses", courseSchema);

export default CourseModel;