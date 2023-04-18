import jwt from "jsonwebtoken";
const generarJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  }); //sign sirve para generar un jwt
};
export default generarJWT;
