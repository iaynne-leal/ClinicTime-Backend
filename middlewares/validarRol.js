
import { request, response } from 'express'

const validarRol = (pk_role) => { //pk_rol requerido
  return (req, res, next) => {
    const pk_rol_usuario = req.user.pk_role; //accedemos al pk_rol del usuario que esta haciendo la petición

    //si el pk_rol del usuario no esta dentro del arreglo del pk_rol requerido para realizar la acción no se va a realizar la petición
    if (!pk_role.includes(pk_rol_usuario)) {
      return res.status(401).json({
        msg: "No tiene los permisos para esta acción",
      });
    }
    next();
  };
};

export {
  validarRol
};
