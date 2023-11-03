import { User } from "../models/User.js";
import { response } from "express";
import { generateJWT } from "../helpers/generateJWT.js";
import { Sequelize } from "sequelize";

const login = async (req, res = response) => {
  const { user, password } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await User.findOne({
      where: { user },
    });

    if (!usuario) {
      return res.status(400).json({
        msg: "El usuario que ingresó no se encuentra registrado",
      });
    }

    // Validar la contraseña
    if (usuario.password !== password) {
      return res.status(400).json({
        msg: "La contraseña es incorrecta",
      });
    }

    // Generar un token si la contraseña es válida
    const token = await generateJWT(usuario.pk_user, usuario.user);
    const role = usuario.pk_role;

    res.json({
      msg: "Inicio de sesión exitoso",
      token,
      role,
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};

export { login };
