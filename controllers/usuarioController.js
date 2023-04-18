import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarID.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, olvidePasswordEmail } from "../helpers/email.js";
const registrarUsuario = async (req, res) => {
  const { email } = req.body;
  const usuarioDuplicado = await Usuario.findOne({ email }); // Se hace busqueda de si el email enviado (nuevo request) ya existe en la db
  if (usuarioDuplicado) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msj: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save(); // Guardar en la db
    emailRegistro({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    return res.json({
      msj: "Revisa tu email para la verificacion de tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};
const autenticarUsuario = async (req, res) => {
  const { email, password } = req.body;
  const usuarioAutenticar = await Usuario.findOne({ email }); // Primero lo que hay que verificar es si el usuario existe
  if (!usuarioAutenticar) {
    const error = new Error("Usuario no registrado");
    return res.status(404).json({ msj: error.message });
  }
  // Segundo verificamos si el usuario ha sido confirmado
  if (!usuarioAutenticar.confirmado) {
    const error = new Error("Usuario no verificado");
    return res.status(403).json({ msj: error.message });
  }
  // Por ultimo verificamos que el password enviado sea el correcto
  if (await usuarioAutenticar.comprobarPassword(password)) {
    res.json({
      _id: usuarioAutenticar._id,
      nombre: usuarioAutenticar.nombre,
      email: usuarioAutenticar.email,
      token: generarJWT(usuarioAutenticar._id),
    });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(403).json({ msj: error.message });
  }
};
const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token }); // Hacemos la consulta a la db si el token enviado a params es un token asociado a un usuario
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msj: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = ""; // Hacemos que el token sea de un único uso
    await usuarioConfirmar.save(); // Guardamos en la db
    res.json({
      msj: `Hola, ${usuarioConfirmar.email}. 
            Tu cuenta ha sido confirmada correctamente`,
    });
  } catch (error) {
    res.json({ msj: "Hubo un error" });
  }
};
const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email }); // Verficamos que el usuario exista (el email enviado por request)
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msj: error.message });
  }
  try {
    usuario.token = generarId(); // En dado caso que sí, le generamos un nuevo token
    await usuario.save(); // Guardamos en la db
    olvidePasswordEmail({
      email: usuario.email,
      nombre: usuario.nombre,
      token: usuario.token,
    });
    return res.json({ msj: "Hemos enviado las instrucciones a tu correo" });
  } catch (error) {
    return res.json({ msj: "Hubo un errror" });
  }
};
const confirmarToken = async (req, res) => {
  // Una vez que le hemos enviado las instrucciones al usuario, este debe de entrar a una url que contenga el token que se le ha asignado
  const { token } = req.params;
  const usuario = await Usuario.findOne({ token });
  if (!usuario) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msj: error.message });
  }
  return res.json({
    msj: "Token valido, puedes proceder a cambiar tu password",
  });
};
const nuevoPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const usuario = await Usuario.findOne({ token }); // Verificamos si el token enviado por params. pertenece a algun registro de la db
  if (usuario) {
    usuario.password = password; // Le asignamos el nuevo password enviado de request
    usuario.token = ""; // Hacemos que el token sea de un unico uso
    try {
      await usuario.save(); // guardamos en la db
      return res.json({ msj: "Password modificado correctamente" });
    } catch (error) {
      res.json({ msj: "Hubo un error" });
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(403).json({ msj: error.message });
  }
};
const obtenerPerfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};
export {
  registrarUsuario,
  autenticarUsuario,
  confirmarCuenta,
  olvidePassword,
  confirmarToken,
  nuevoPassword,
  obtenerPerfil,
};
