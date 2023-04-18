import express from "express";
import {
  eliminarMovie,
  nuevaMovie,
  obtenerMovies,
} from "../controllers/movieController.js";
import checkAuth from "../middleware/checkAuth.js";
import comprobarId from "../middleware/comprobarId.js";
const router = express.Router();
router.route("/").get(checkAuth, obtenerMovies).post(checkAuth, nuevaMovie);
router.route("/:eliminar").delete(checkAuth, eliminarMovie);
export default router;
