import mongoose from "mongoose";
const db = async () => {
  //Hacemos la conexion a la db
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log("Mongo DB corriendo desde:", url);
  } catch (error) {
    console.log(error.message);
  }
};

export default db;
