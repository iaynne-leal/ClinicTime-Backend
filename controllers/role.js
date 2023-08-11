import { response, request } from "express";
import { Op } from "sequelize";
import { Role } from "../models/Role.js";

const roleGet = async (req = request, res = response) => {
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
    const roles = await Role.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_role: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        role: {
          [Op.like]: '%'+search+'%'
        }
      },
      where: {
        comment: {
          [Op.like]: '%'+search+'%'
        }
      },
      
      attributes: ["pk_role", "role",
      "comment",
      
      ],
    });

    const count = await Role.count(
      {
        where: {
          pk_role: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          role: {
            [Op.like]: '%'+search+'%'
          }
        },
        where: {
          comment: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )
    res.json({
      roles, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no control", error });
  }
};

const rolePost = async (req, res = response) => {
  //const body = req.body;
  const { role, comment } = req.body;

  try {
    const roles = new Role({
        role,
        comment

    });

    //guardar paciente en la BD
    await roles.save();
    res.json({
      msg: "rol creado correctamente",
      roles,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};

const rolePut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    role,
    comment
  } = req.body;

  try {
    // Busca el rol por su id
    const roles = await Role.findByPk(pk);

    if (!roles) {
      return res.status(404).json({
        msg: "No se encontró el usuario.",
      });
    }

    // Actualiza la información del rol con el método update

    await roles.update({
    role,
    comment
    });

    res.json({
      msg: "Usuario actualizado",
      roles,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el usuario.",
      error,
    });
  }
};

const roleDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const roles = await Role.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (roles) {
      // Si se encontró el asociado, procede a eliminarlo.
      await roles.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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

export {
  roleGet,
  rolePost,
  rolePut,
  roleDelete
};
