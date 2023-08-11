import { response, request } from "express";
import { Op } from "sequelize";
import { User } from "../models/User.js";


const userGet = async (req = request, res = response) => {
  let { search, pagina = 1, limite = 5 } = req.query;

  const pageAsNumber = Number.parseInt(pagina);
  const limitAsNumber = Number.parseInt(limite);

  let page = 1;
  if (!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 5;
  if (!Number.isNaN(limitAsNumber) && limitAsNumber > 0 && limitAsNumber < 6) {
    size = limitAsNumber;
  }

  if (search === undefined) {
    search = "";
  } else {
    search = search.trim();
  }

  try {
    const users = await User.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_user: {
          [Op.like]: '%'+search+'%'
        }
      },
      attributes: ["pk_user", "name_user",
      "user",
      "password",
      "email",
      "phone",
      "pk_role"
      ],
    });

    const count = await User.count(
      {
        where: {
          pk_user: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )
    res.json({
      users, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const userPost = async (req, res = response) => {
  //const body = req.body;
  const {
    name_user,
    user,
    password,
    email,
    phone,
    pk_role
  
  } = req.body;

  try {
    const users = new User({
        name_user,
        user,
        password,
        email,
        phone,
        pk_role

    });

    //guardar paciente en la BD
    await User.save();
    res.json({
      msg: "paciente creado correctamente",
      users,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};

const userPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    name_user,
    user,
    password,
    email,
    phone,
    pk_role
  } = req.body;

  try {
    // Busca el rol por su id
    const users = await User.findByPk(pk);

    if (!users) {
      return res.status(404).json({
        msg: "No se encontró el usuario.",
      });
    }

    // Actualiza la información del rol con el método update

    await User.update({
        name_user,
        user,
        password,
        email,
        phone,
        pk_role
    });

    res.json({
      msg: "Asociado actualizado",
      users,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el usuario.",
      error,
    });
  }
};

const userDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const users = await User.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (users) {
      // Si se encontró el asociado, procede a eliminarlo.
      await users.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: "Asociado eliminado con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró el asociado.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar el usuario.",
      error,
    });
  }
};

const userShow = async (req, res = response) => {
  const { pk } = req.query; // obtiene el id del usuario de los parámetros de la solicitud

  try {
    const users = await User.findByPk(pk, {
      attributes: ["pk_user", "name_user",
      "user",
      "password",
      "email",
      "phone",
      "pk_role"],
    }); // busca el usuario en la base de datos por su id

    if (!users) {
      return res
        .status(404)
        .json({ msg: `El usuario con id ${pk} no existe en la base de datos` });
    }

    return res.json({ users }); // envía el usuario encontrado como respuesta
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error no controlado" });
  }
};

const obtenerUsersDoctor = async (req = request, res = response) => {
  const { pk_user, name_user } = req.user;

  try {
    const doctor = await User.findAll({
      where: {
        pk_rol: 2
      },

      attributes: ["pk_user", "name_user"],
    });

    res.json({
      doctor,
      user: { pk_user, name_user }
    });

  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

export {
  userGet,
  userPost,
  userPut,
  userDelete,
  userShow,
  obtenerUsersDoctor
};
