import express from "express";
import { obtenerListas, nuevaLista } from "../controllers/listaController.js";
import checkAuth from "../middleware/checkAuth.js";
const router = express.Router();
router.route("/").post(checkAuth, nuevaLista).get(checkAuth, obtenerListas);
export default router