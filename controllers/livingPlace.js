import { response, request } from "express";
import { Op } from "sequelize";
import LivingPlace from "../models/LivingPlace";

// Controlador para obtener información de viviendas con el metodo GET

const livingGet = async (req = request, res = response) => {
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

// Manejo de búsqueda: si no se proporciona, se establece como cadena vacía

  if (search === undefined) {
    search = "";
  } else {
    search = search.trim();
  }

  try {

 // Consulta las viviendas que coinciden con el patrón de búsqueda
    const living = await LivingPlace.findAll({
      limit: size,
      offset: size * (page - 1),

      where: {
        pk_living_place: {
          [Op.like]: '%'+search+'%'
        }
      },
      attributes: ["pk_living_place", "address",
      "department",
      "municipality",
      "pk_patient",
      ],
    });

// Cuenta la cantidad total de viviendas que coinciden con el patrón de búsqueda
    const count = await LivingPlace.count(
      {
        where: {
          pk_living_place: {
            [Op.like]: '%'+search+'%'
          }
        }
      }
    )

// Envía la respuesta en formato JSON
    res.json({
      living,
      cantidad: count,
      totalPaginas: Math.ceil(count/size)
    });
  } catch (error) {
    res.status(500).json({ msg: "Error no controlado" });
  }
};

// Controlador para crear una nueva vivienda con el metodo POST
const livingPost = async (req, res = response) => {
  const {
    address,
    department,
    municipality,
    pk_patient
  } = req.body;

  try {

     // Crea una instancia del modelo LivingPlace con los datos proporcionados
    const living = new LivingPlace({
        address,
        department,
        municipality,
        pk_patient

    });

    //guardar vivienda en la BD
    await living.save();
    res.json({
      msg: "vivienda creada correctamente",
      living,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Algo salió mal",
      error,
    });
  }
};

// Controlador para actualizar información de una vivienda con el metodo PUT
const livingPut = async (req = request, res = response) => {
// Obtiene el parámetro de la URL (pk) y los datos del cuerpo de la solicitud
    const pk = req.params.pk;
  const {
    address,
    department,
    municipality,
    pk_patient
  } = req.body;

  try {
    // Busca el paciente por su id
    const living = await LivingPlace.findByPk(pk);

    if (!living) {
      return res.status(404).json({
        msg: "No se encontró el paciente.",
      });
    }

    // Actualiza la información del paciente con el método update

    await living.update({
        address,
        department,
        municipality,
        pk_patient
    });
  // Envía una respuesta JSON
    res.json({
      msg: "Informacion del paciente actualizada",
      living,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar actualizar los datos del usuario.",
      error,
    });
  }
};

// Controlador para eliminar una vivienda con el metodo DELETE
const livingDelete = async (req, res = response) => {
  const pk = req.params.pk;
  try {
    const living = await LivingPlace.findByPk(pk); // Busca el asociado por su id utilizando el método findByPk
    if (living) {
      // Si se encontró el asociado, procede a eliminarlo.
      await living.destroy(); // Utiliza el método destroy para eliminar el usuario de la base de datos.
      res.json({
        msg: "vivienda eliminado con éxito.", // Si funciona, sale el mensaje
      });
    } else {
      res.status(404).json({
        msg: "No se encontró niguna vivienda.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Ocurrió un error al intentar eliminar la vivienda.",
      error,
    });
  }
};

export {
  livingGet,
  livingPost,
  livingPut,
  livingDelete
};
