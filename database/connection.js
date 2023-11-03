import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";
import { initAppoinment, initLivingPlace, initPatient, initRole, initUser, initUserPatient } from "../models/index.js";

// Creación de una nueva instancia de Sequelize para la conexión a la base de datos
const db = new Sequelize(process.env.BD, process.env.USER, process.env.PASS, {
  host: process.env.HOST,
  dialect: "mysql",
  /*  port: process.env.PORTA, */
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false
  //   }
  // }
  // logging: false;
});

try {
  await db.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Inicialización de los modelos de la base de datos
const Appoinment = initAppoinment(db, DataTypes);
const User = initUser(db, DataTypes);
const LivingPlace = initLivingPlace(db,DataTypes)
const Patient = initPatient(db,DataTypes)
const Role = initRole(db,DataTypes)
const UserPatient = initUserPatient(db,DataTypes)



//llave primaria de paciente a llave foranea de vivienda
/* Patient.hasMany(LivingPlace, { foreignKey: "pk_patient" }); // Un paciente solo puede tener una vivienda */
LivingPlace.hasMany(Patient, {foreignKey: "pk_living_place", sourceKey: "pk_living_place"})


//llave primaria de rol a llave foranea de usuario
User.belongsTo(Role, { foreignKey: "pk_role" }); // un usuario puede tener un rol
Role.hasMany(User, { foreignKey: "pk_role" }); // un rol puede tener varios usuarios

//Lave primaria usuario a llave foranea de citas
Appoinment.belongsTo(User, { foreignKey: "pk_user" }); //  una cita puede ser creada por un usuario
User.hasMany(Appoinment, { foreignKey: "pk_user" }); // un usuario puede crear varias citas

//llave primaria de paciente a llave foranea de citas
Appoinment.hasMany(Patient, { sourceKey:"pk_patient" , foreignKey: "pk_patient" }); //  una cita puede tener a varios pacientes
Patient.belongsTo(Appoinment, { targetKey:"pk_patient", foreignKey: "pk_patient" }); // un paciente pertenece a una citas

/* Appoinment.belongsToMany(Patient, { through: "t_appoinment_patient" }); // Muchos a muchos */


export { db };
