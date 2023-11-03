import { response, request } from "express";
import { Op } from "sequelize";
import { Appoinment } from "../models/Appoinment.js";
import {Patient} from "../models/Patient.js";


const appoinmentGet = async (req = request, res = response) => {
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
    const appoinments = await Appoinment.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_appoinment: {
          [Op.like]: '%'+search+'%'
        }
      },
      attributes: ["pk_appoinment", "next_appoinment",
      "pk_patient",
      "pk_user",
      ],
      include:[
        {model:Patient, as:"patients"}
      ]
    });

  /*   console.log("hol", await appoinments.get) */
    const count = await Appoinment.count(
      {
        where: {
          pk_appoinment: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )
    res.json({
      appoinments, 
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
    console.log("que esta pasando", error)
  }
};



const appoinmentPost = async (req, res = response) => {
  //const body = req.body;
  const {
    pk_appoinment, 
    next_appoinment,
    pk_patient,
    pk_user
  
  } = req.body;

  try {
    const appoinments = new Appoinment({
      pk_appoinment, 
      next_appoinment,
      pk_patient,
      pk_user

    });

    //guardar paciente en la BD
    await appoinments.save();
    res.json({
      msg: "la cita creada correctamente",
      appoinments,
    });
    
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
      
    });
    console.log(error)
  }
};


const appoinmentPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    pk_appoinment, 
    next_appoinment,
    pk_patient,
    pk_user
  } = req.body;

  try {
    // Busca el rol por su id
    const _appoinment = await Appoinment.findByPk(pk);

    if (!_appoinment) {
      return res.status(404).json({
        msg: "No se encontró la cita.",
      });
    }

    // Actualiza la información del rol con el método update

    await _appoinment.update({
      pk_appoinment, 
      next_appoinment,
      pk_patient,
      pk_user
    });

    res.json({
      msg: " cita actualizada",
      user: _appoinment,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar la cita.",
      error,
    });
    console.log("KRISHNAA", error)
  }
};

const appoinmentDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const appoinments = await Appoinment.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (appoinments) {
      // Si se encontró el asociado, procede a eliminarlo.
      await appoinments.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: "la cita eliminada con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró la cita.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar la cita.",
      error,
    });
  }
};

export {
  appoinmentGet,
  appoinmentPost,
  appoinmentPut,
  appoinmentDelete,
  
};
