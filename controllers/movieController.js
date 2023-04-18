import Movie from "../models/Movies.js";
const obtenerMovies = async (req, res) => {
  // Traemos todos los proyectos donde el creador sea el que esta autenticado (por medio del token)
  const movies = await Movie.find().where("creador").equals(req.usuario);
  res.json(movies);
};
const nuevaMovie = async (req, res) => {
  const movie = new Movie(req.body); // Generamos la instancia del nuevo proyecto
  movie.creador = req.usuario._id;
  try {
    const selectMovie = await movie.save(); // Lo guardamo en la db
    res.json(selectMovie);
  } catch (error) {
    console.log(error);
  }
};
const eliminarMovie = async (req, res) => {
  const { eliminar } = req.params;
  const movie = await Movie.findOne({ eliminar }); // Traemos el proyecto por su id enviado al endpoint

  // Verificamos si el proyecto existe
  if (!movie) {
    const error = new Error("Movie no encontrado");
    return res.status(404).json({ msj: error.message });
  }
  // Verficamos si la persona que esta enviando la peticion es la misma persona quien creo ese proyecto
  if (movie.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error("Acción no válida");
    return res.status(401).json({ msj: error.message });
  }
  try {
    await movie.deleteOne();
    res.json({ msj: "Movie Eliminado" });
  } catch (error) {
    console.log(error);
  }
};
// const agregarTarea = async (req, res) => {
//   // Verfificamos si el proyecto existe
//   const { proyecto } = req.body;
//   const existeProyecto = await Proyecto.findById(proyecto); // Buscamos el proyecto enviado a los params en el db
//   if (!existeProyecto) {
//     //Error si no exite el proyecto
//     const error = new Error("Proyecto no encontrado");
//     return res.status(404).json({ msj: error.message });
//   }
//   if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
//     // Error en en el caso de que usuario no este autorizado
//     const error = new Error("Acción no valida");
//     return res.status(403).json({ msj: error.message });
//   }
//   try {
//     const tareaAlmacenada = await Tarea.create(req.body); // Creamos nueva tarea sino se tienen errores
//     res.json(tareaAlmacenada);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const obtenerTarea = async (req, res) => {
//   const { id } = req.params;
//   const tarea = await Tarea.findById(id).populate("proyecto");
//   if (!tarea) {
//     const error = new Error("Tarea no encontrada");
//     return res.status(404).json({ msj: error.message });
//   }
//   if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
//     const error = new Error("Acción no valida");
//     return res.status(403).json({ msj: error.message });
//   }
//   res.json(tarea); // Si no se tienen errores, entonces mostramos la tarea al usuario
// };
export { nuevaMovie, obtenerMovies, eliminarMovie };
