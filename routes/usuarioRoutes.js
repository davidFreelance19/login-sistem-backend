import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
  autenticarUsuario,
  confirmarCuenta,
  confirmarToken,
  nuevoPassword,
  olvidePassword,
  registrarUsuario,
  obtenerPerfil,
} from "../controllers/usuarioController.js";
const router = express.Router();
router.post("/", registrarUsuario);
router.post("/login", autenticarUsuario);
router.get("/confirmar-cuenta/:token", confirmarCuenta);
router.post("/olvide-password", olvidePassword);
router.get("/olvide-password/:token", confirmarToken);
router.post("/olvide-password/:token", nuevoPassword);
router.get("/perfil", checkAuth, obtenerPerfil);
export default router;
