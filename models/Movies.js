import mongoose from "mongoose";
const movieSchema = mongoose.Schema(
  {
    titulo: {
      type: String,
      trim: true,
    },
    poster: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    id: {
      type: String,
      trim: true,
      require: true,
    },
    eliminar: {
      type: String,
      trim: true,
    },
    creador: {
      type: mongoose.Schema.Types.ObjectId, // Referencia al usuario
      ref: "Usuario", // Ref para relacionar con la tabla en este caso la de Usuario
    },
  },
  {
    timestamps: true, // Para saber cuando fue creada y actualizada
  }
);
const Movie = mongoose.model("Movie", movieSchema);
export default Movie;
