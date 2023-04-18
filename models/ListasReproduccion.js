import mongoose from "mongoose";
const listaReproduccionSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      require: true,
    },
    descripcion: {
      type: String,
      trim: true,
      require: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al usuario
      ref: "Usuario", // Ref para relacionar con la tabla en este caso la de Usuario
    },
    movies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ListaReproduccion = mongoose.model(
  "ListaReproduccion",
  listaReproduccionSchema
);
export default ListaReproduccion;
