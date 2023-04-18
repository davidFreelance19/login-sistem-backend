import Lista from "../models/ListasReproduccion.js";
const obtenerListas = async (req, res) => {
  // Traemos todos los proyectos donde el creador sea el que esta autenticado (por medio del token)
  const lista = await Lista.find().where("creador").equals(req.usuario);
  res.json(lista);
};
const nuevaLista = async (req, res) => {
  const lista = new Lista(req.body); // Generamos la instancia del nuevo proyecto
  lista.creador = req.usuario._id;
  try {
    const listaAlmacenado = await lista.save(); // Lo guardamo en la db
    res.json(listaAlmacenado);
  } catch (error) {
    console.log(error);
  }
};
export { nuevaLista, obtenerListas };
