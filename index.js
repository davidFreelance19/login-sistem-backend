import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import routerUsuario from "./routes/usuarioRoutes.js";
import movieRoutes from "./routes/moviesRoutes.js";
import listaRoutes from "./routes/listaRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json()); // Metodo para poder procesar informacion de tipo json
dotenv.config(); // Hacemos la configuracion para que se puedan leer variables de entorno
db();

// Configurar CORS
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //Puede consultar la API
      callback(null, true);
    } else {
      callback(new Error("Error de cors"));
    }
  },
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 4000; // process.env.PORT se asgina de manera automatica al momento de hacer el deploy
app.use("/api/usuarios", routerUsuario);
app.use("/api/movies", movieRoutes);
app.use("/api/listas-reproduccion", listaRoutes);
app.listen(PORT, () => {
  console.log("servidor corriendo desde", PORT);
});
