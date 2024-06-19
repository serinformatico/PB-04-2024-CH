import { Schema, model } from "mongoose";

const studentSchema = new Schema({
    name: { type: String, required: true, uppercase: true, trim: true, maxLength: 25 },
    surname: { type: String, required: true },
    age: { type: Number, min: 18, max: 65 },
    email: { type: String, unique: true },
    isActive: Boolean,
    subjects: [String],
});

const StudentModel = model("student", studentSchema);

export default StudentModel;