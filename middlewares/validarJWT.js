
import { request, response } from 'express'
import  jwt  from "jsonwebtoken";
import { User } from '../models/User';


const validarJWT = async (req = request, res = response, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(500).json({
      msg: "No existe un token en la petición",
    });
  }

  try {
    const { pk_user } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findByPk(pk_user);
    if (!user) {
      return res.status(400).json({
        msg: "El user no existe en la base de datos",
      });
    }
    req.user = user;
    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(600).json({
        msg: "Token expiró",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Token no valido.",
      });
    } else if (error.name === "NotBeforeError") {
      return res.status(407).json({
        msg: "Token no valido..",
      });
    } else {
      return res.status(500).json({
        msg: "Error interno",
      });
    }
  }
};

export {
  validarJWT
};
