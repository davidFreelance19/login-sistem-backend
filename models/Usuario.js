import mongoose from "mongoose";
import bcrypt from "bcrypt";
// Generamos el schema
const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Antes de almacenar el registro en la db
usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // Generamos el hash del password y almacenamos
});
usuarioSchema.methods.comprobarPassword = async function (passwordForm) {
  return await bcrypt.compare(passwordForm, this.password); // Comparamos el password hasheado con el que estamos enviando (metodo compare)
};
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
