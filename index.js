import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
const app = express();
// Hacemos la configuracion para que se puedan leer variables de entorno
dotenv.config();
db();
const PORT = process.env.PORT || 4000; // process.env.PORT se asgina de manera automatica al momento de hacer el deploy
app.listen(PORT, () => {
  console.log("servidor corriendo desde", PORT);
});
