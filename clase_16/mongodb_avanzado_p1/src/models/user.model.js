import { Schema, model } from "mongoose";

const userSchema = new Schema({
    nickName: { type: String, index: { name: "idx_nickname" } }, // Índice simple.
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    email: { type: String, unique: true }, // Índice único.
    dni: { type: Number },
    address: { type: String },
    description: { type: String, index: { type: "text", name: "idx_txt_description" } }, // Índice de tipo texto.
    favoriteMovies: [{ type: Schema.Types.ObjectId, ref: "movies" }], // Asociación con IDs de movies
});

userSchema.index({ firstName: 1, lastName: 1 }, { name: "idx_firstname_lastname" }); // Índice compuesto.
userSchema.index({ dni: 1, address: 1 }, { name: "idx_dni_address", unique: true }); // Índice compuesto único.

// Middleware que aplica populate a find(), findOne(), findById(), etc.
userSchema.pre(/^find/, function(next) {
    this.populate("favoriteMovies");
    next();
});

const UserModel = model("users", userSchema);

export default UserModel;