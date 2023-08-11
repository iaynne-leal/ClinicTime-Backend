import { response, request } from "express";
import { Patient } from "../models/Patient";
import { Op } from "sequelize";

//controlador
const patientGet = async (req = request, res = response) => {
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
    const patients = await Patient.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        name: {
          [Op.like]: '%'+search+'%'
        }
      },
      attributes: ["pk_patient", "name",
      "birthday",
      "email",
      "cod_patient",
      "dpi",
      "phone",
      ],
    });

    const count = await Patient.count(
      {
        where: {
          name: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )
    res.json({
      patients,
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

const patientPost = async (req, res = response) => {
  //const body = req.body;
  const {
    name,
    birthday,
    email,
    cod_patient,
    dpi,
    phone
  
  } = req.body;

  try {
    const patient = new Patient({
    name,
    birthday,
    email,
    cod_patient,
    dpi,
    phone

    });

    //guardar paciente en la BD
    await patient.save();
    res.json({
      msg: "paciente creado correctamente",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};

const patientPut = async (req = request, res = response) => {
  const pk = req.params.pk;
  const {
    name,
    birthday,
    email,
    cod_patient,
    dpi,
    phone
  } = req.body;

  try {
    // Busca el asociado por su id
    const patient = await Patient.findByPk(pk);

    if (!patient) {
      return res.status(404).json({
        msg: "No se encontró el usuario.",
      });
    }

    // Actualiza la información del asociado con el método update

    await patient.update({
    name,
    birthday,
    email,
    cod_patient,
    dpi,
    phone
    });

    res.json({
      msg: "Asociado actualizado",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar el usuario.",
      error,
    });
  }
};

const patientDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const patient = await Patient.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (patient) {
      // Si se encontró el asociado, procede a eliminarlo.
      await patient.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
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
  patientGet,
  patientPost,
  patientPut,
  patientDelete
};
