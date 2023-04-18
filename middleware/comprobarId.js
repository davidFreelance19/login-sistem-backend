const comprobarID = (req, res, next) => {
    const { id } = req.params;
    const _id = id.trim();
    //Generamos un fixed para validar el id
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(401).json({ msj: "El id no es válido" });
    }
    next();
  };
  export default comprobarID;
  