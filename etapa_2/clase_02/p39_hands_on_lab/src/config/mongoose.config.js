import { connect, Types } from "mongoose";

const connectDB = async () => {
    const URI = "mongodb+srv://sergio:Y2aiTV3letzbtqiV@cluster0.4i0l5oa.mongodb.net";

    try {
        connect(URI, { dbName: "class-zero" });
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar con MongoDB", error.message);
    }
};

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default {
    connectDB,
    isValidID,
};