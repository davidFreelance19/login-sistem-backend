import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verficamos el token
      req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v"
      ); // Traemos al usuario por su id
      return next();
    } catch (error) {
      return res.status(404).json({ msj: "Hubo un error" });
    }
  }
  if (!token) {
    const error = new Error("Token no válido");
    return res.status(401).json({ msj: error.message });
  }
  next();
};
export default checkAuth;
